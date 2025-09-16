#!/usr/bin/env python3
"""
Main script for generating Strands AI agents from resume JSON.

Usage:
    python generate_agent.py --input resume.json --personality professional --output agent_prompt.md
    python generate_agent.py --input resume.json --all-personalities
"""

import argparse
import json
import os
from pathlib import Path
from strands_agent import AgentFactory, AgentPersonality, ResumeProcessingPipeline


def main():
    parser = argparse.ArgumentParser(description='Generate AI agents from resume JSON')
    parser.add_argument(
        '--input', '-i',
        type=str,
        required=True,
        help='Path to resume JSON file (can be .json or .md with embedded JSON)'
    )
    parser.add_argument(
        '--personality', '-p',
        type=str,
        choices=['professional', 'creative', 'executive', 'technical', 'casual'],
        default='professional',
        help='Agent personality type'
    )
    parser.add_argument(
        '--prompt-type', '-t',
        type=str,
        choices=['interview', 'portfolio', 'networking'],
        default='interview',
        help='Type of prompt to generate'
    )
    parser.add_argument(
        '--output', '-o',
        type=str,
        help='Output file path for the generated prompt'
    )
    parser.add_argument(
        '--all-personalities',
        action='store_true',
        help='Generate prompts for all personality types'
    )
    parser.add_argument(
        '--validate-only',
        action='store_true',
        help='Only validate the JSON schema without generating prompts'
    )
    
    args = parser.parse_args()
    
    # Check if input file exists
    if not os.path.exists(args.input):
        print(f"Error: Input file '{args.input}' not found")
        return 1
    
    try:
        # Load resume data
        if args.input.endswith('.md'):
            # Extract JSON from markdown file
            with open(args.input, 'r') as f:
                content = f.read()
                
            # Look for JSON content
            import re
            json_match = re.search(r'```json\s*([\s\S]*?)\s*```', content)
            if json_match:
                json_content = json_match.group(1)
            else:
                # Try to find JSON starting with {
                json_start = content.find('{')
                if json_start != -1:
                    json_content = content[json_start:]
                else:
                    print("Error: No JSON found in markdown file")
                    return 1
            
            # Clean up escaped characters if present
            # Replace all common escape sequences
            escape_pairs = [
                (r'\_', '_'),
                (r'\[', '['),
                (r'\]', ']'),
                (r'\~', '~'),
                (r'\:', ':'),
                (r'\@', '@'),
                (r'\&', '&'),
                (r'\#', '#'),
                (r'\$', '$'),
                (r'\%', '%'),
                (r'\^', '^'),
                (r'\*', '*'),
                (r'\(', '('),
                (r'\)', ')'),
                (r'\{', '{'),
                (r'\}', '}'),
                (r'\|', '|'),
                (r'\<', '<'),
                (r'\>', '>'),
                (r'\'', "'"),
                (r'\"', '"'),
                (r'\`', '`'),
                (r'\\', '\\')
            ]
            
            for old, new in escape_pairs:
                json_content = json_content.replace(old, new)
            
            resume_data = json.loads(json_content)
        else:
            with open(args.input, 'r') as f:
                resume_data = json.load(f)
        
        # Validate schema if requested
        if args.validate_only:
            is_valid = ResumeProcessingPipeline.validate_json_schema(resume_data)
            if is_valid:
                print("✓ JSON schema is valid")
                return 0
            else:
                print("✗ JSON schema validation failed")
                print("Required fields: profile (with name, headline), experience, skills")
                return 1
        
        # Generate prompts
        if args.all_personalities:
            # Generate for all personalities
            agents = AgentFactory.create_multiple_personalities(resume_data)
            
            for personality_name, agent in agents.items():
                print(f"\n{'='*60}")
                print(f"Personality: {personality_name.upper()}")
                print('='*60)
                
                # Generate all prompt types
                for prompt_type in ['interview', 'portfolio', 'networking']:
                    output_file = None
                    if args.output:
                        base_path = Path(args.output).parent
                        base_name = Path(args.output).stem
                        extension = Path(args.output).suffix or '.md'
                        output_file = str(base_path / f"{base_name}_{personality_name}_{prompt_type}{extension}")
                    
                    if prompt_type == 'interview':
                        prompt = agent.get_interview_prompt()
                    elif prompt_type == 'portfolio':
                        prompt = agent.get_portfolio_prompt()
                    else:
                        prompt = agent.get_networking_prompt()
                    
                    if output_file:
                        with open(output_file, 'w') as f:
                            f.write(prompt)
                        print(f"  {prompt_type.capitalize()}: Saved to {output_file}")
                    else:
                        print(f"\n{prompt_type.upper()} PROMPT:")
                        print("-" * 40)
                        print(prompt[:500] + "..." if len(prompt) > 500 else prompt)
        
        else:
            # Generate for single personality
            personality_enum = AgentPersonality[args.personality.upper()]
            agent = AgentFactory.create_from_dict(resume_data, personality_enum)
            
            # Get the specified prompt type
            if args.prompt_type == 'interview':
                prompt = agent.get_interview_prompt()
            elif args.prompt_type == 'portfolio':
                prompt = agent.get_portfolio_prompt()
            else:
                prompt = agent.get_networking_prompt()
            
            # Output the prompt
            if args.output:
                with open(args.output, 'w') as f:
                    f.write(prompt)
                print(f"✓ Generated {args.prompt_type} prompt with {args.personality} personality")
                print(f"✓ Saved to: {args.output}")
                
                # Show a preview
                print("\nPreview (first 500 chars):")
                print("-" * 40)
                print(prompt[:500] + "..." if len(prompt) > 500 else prompt[:500])
            else:
                print(prompt)
        
        return 0
        
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in input file - {e}")
        return 1
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return 1


def generate_example_prompts():
    """Generate example prompts for Jerel using the existing data."""
    # Path to Jerel's resume JSON
    jerel_json_path = Path(__file__).parent / 'jerel-resume-json.md'
    
    if not jerel_json_path.exists():
        print(f"Jerel's resume JSON not found at {jerel_json_path}")
        return
    
    print("Generating example prompts for Jerel Velarde...")
    print("=" * 60)
    
    # Create agent with professional personality
    agent = AgentFactory.create_from_json_file(str(jerel_json_path), AgentPersonality.PROFESSIONAL)
    
    # Generate and save interview prompt
    interview_prompt = agent.get_interview_prompt()
    interview_output = jerel_json_path.parent / 'jerel_interview_agent.md'
    with open(interview_output, 'w') as f:
        f.write(interview_prompt)
    print(f"✓ Interview agent prompt saved to: {interview_output}")
    
    # Generate and save portfolio prompt
    portfolio_prompt = agent.get_portfolio_prompt()
    portfolio_output = jerel_json_path.parent / 'jerel_portfolio_agent.md'
    with open(portfolio_output, 'w') as f:
        f.write(portfolio_prompt)
    print(f"✓ Portfolio agent prompt saved to: {portfolio_output}")
    
    # Generate and save networking prompt
    networking_prompt = agent.get_networking_prompt()
    networking_output = jerel_json_path.parent / 'jerel_networking_agent.md'
    with open(networking_output, 'w') as f:
        f.write(networking_prompt)
    print(f"✓ Networking agent prompt saved to: {networking_output}")
    
    print("\nAll prompts generated successfully!")


if __name__ == '__main__':
    import sys
    
    # If no arguments provided, generate example prompts for Jerel
    if len(sys.argv) == 1:
        generate_example_prompts()
    else:
        sys.exit(main())
