type TemplatePart =
  | { type: "text"; value: string }
  | { type: "placeholder"; name: string };

interface Template {
  parts: TemplatePart[];
}

interface Inputs {
  [key: string]: string;
}

/**
 * Parses a template string and returns a Template object.
 * Placeholders are identified by the syntax {{placeholderName}}.
 *
 * @param templateStr - The template string to parse.
 * @returns A Template object containing an array of TemplateParts.
 */
export function parseTemplate(templateStr: string): Template {
  const parts: TemplatePart[] = [];
  const regex = /{{\s*([^}]+)\s*}}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(templateStr)) !== null) {
    const [placeholder, name] = match;
    const index = match.index;

    // Add preceding text as TextPart
    if (index > lastIndex) {
      parts.push({
        type: "text",
        value: templateStr.substring(lastIndex, index),
      });
    }

    // Add the placeholder
    parts.push({
      type: "placeholder",
      name: name.trim(),
    });

    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last placeholder
  if (lastIndex < templateStr.length) {
    parts.push({
      type: "text",
      value: templateStr.substring(lastIndex),
    });
  }

  return { parts };
}

// console.log(parseTemplate("Hello {{name}}"));
const prompt1 = `
Your goal is to improve the prompt given below for {{task}} :

--------------------

Prompt: {{lazy_prompt}}

--------------------

Here are several tips on writing great prompts:

-------

Start the prompt by stating that it is an expert in the subject.

Put instructions at the beginning of the prompt and use ### or to separate the instruction and context 

Be specific, descriptive and as detailed as possible about the desired context, outcome, length, format, style, etc 

---------

Here's an example of a great prompt:

As a master YouTube content creator, develop an engaging script that revolves around the theme of "Exploring Ancient Ruins."

Your script should encompass exciting discoveries, historical insights, and a sense of adventure.

Include a mix of on-screen narration, engaging visuals, and possibly interactions with co-hosts or experts.

The script should ideally result in a video of around 10-15 minutes, providing viewers with a captivating journey through the secrets of the past.

Example:

"Welcome back, fellow history enthusiasts, to our channel! Today, we embark on a thrilling expedition..."

-----

Now, improve the prompt.

IMPROVED PROMPT:
`;

// console.log(parseTemplate(prompt1));

export function renderPrompt(template: Template, inputs: Inputs): string {
  return template.parts
    .map((part) => {
      if (part.type === "text") {
        return part.value;
      } else if (part.type === "placeholder") {
        return inputs[part.name] !== undefined
          ? inputs[part.name]
          : `{{${part.name}}}`;
      } else {
        return "";
      }
    })
    .join("");
}

console.log(renderPrompt(parseTemplate(prompt1), { task: "writing a youtube video script", lazy_prompt: "write a youtube video script" }));
export function validateInputs(template: Template, inputs: Inputs): string[] {
    const placeholders = template.parts
      .filter(part => part.type === 'placeholder')
      .map(part => part.name);
    
    const missing = placeholders.filter(name => !(name in inputs));
    
    return Array.from(new Set(missing)); // Remove duplicates
  }