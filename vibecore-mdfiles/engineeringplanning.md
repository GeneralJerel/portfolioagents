THINK LIKE A STARTUP ENGINEER, We're building a 1 day prototype for this project. SIMPLEST Possible to make it work.


create a engineering.md an engineering plan to move from prototype to MVP, plan for mvp backend we want to deploy the following

1. read resume (multimodal LLM)
- intake PDF
- basic verification
- output structured json (see "jerel-resume-json.md" for the structure)

2. Create Voice Agent Prompt
- ask user about preferences (the tone questions)
- create a voice card section for the prompt based on the user's answers 
- write a voice agent prompt for vapi using the voice card section and the JSON see "jerel-agent.py" 

3. Create a function that would read the resume-json and serve it in the 3 formats
- read resume-json.md and serve in the template

4. Publish to unique public link
- users will have a public link to share their portfolio page + voice agent

Use ai folder for ai related,
we'll use strands and vapi (required)

we'll use openai models (4.1 or realtime) 
deploy in vercel
if needed supabase 
