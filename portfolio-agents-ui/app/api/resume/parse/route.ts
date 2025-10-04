import { NextRequest, NextResponse } from 'next/server';
import { convertPdfToImages } from '@/lib/pdf/converter';
import { parseResumeWithAI, validateAndEnrichResume } from '@/lib/ai/resume-parser';
import { resumeSchema } from '@/lib/schemas/resume-schema';
import { nanoid } from 'nanoid';
import { savePortfolio } from '@/lib/storage/supabase-storage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Step 1: Convert PDF to images
    console.log('Converting PDF to images...');
    const images = await convertPdfToImages(buffer);

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'Failed to extract images from PDF' },
        { status: 500 }
      );
    }

    console.log(`Extracted ${images.length} page(s) from PDF`);

    // Step 2: Parse with OpenAI
    console.log(`Parsing ${images.length} page(s) with AI...`);
    const parsedData = await parseResumeWithAI(images);

    // Step 3: Validate and enrich
    const validation = await validateAndEnrichResume(parsedData);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Resume parsing validation failed',
          details: validation.errors,
          partialData: validation.data,
        },
        { status: 422 }
      );
    }

    // Step 4: Validate against Zod schema
    const validatedData = resumeSchema.parse(validation.data);

    // Step 5: Generate unique portfolio ID
    const portfolioId = nanoid(10);

    // Step 6: Store as JSON file
    await savePortfolio(portfolioId, validatedData);

    console.log(`Portfolio saved with ID: ${portfolioId}`);

    return NextResponse.json({
      success: true,
      portfolioId,
      slug: validatedData.page.slug,
      data: validatedData,
      stats: {
        pages: images.length,
        experience_count: validatedData.experience.length,
        skills_count: validatedData.skills.length,
        education_count: validatedData.education.length,
        projects_count: validatedData.projects?.length || 0,
      },
    });

  } catch (error: any) {
    console.error('Resume parsing error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to parse resume',
        message: error.message,
        details: error.stack,
      },
      { status: 500 }
    );
  }
}
