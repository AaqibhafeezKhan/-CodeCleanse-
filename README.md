# -CodeCleanse-

A pure HTML/CSS/JavaScript solution to remove comments from many common programming languages. This version now includes a reset-on-language-change (plus a dedicated Reset button) and a basic code formatting routine.

## Features

- **Broad Language Support**:  
  Supports C, C++, C#, Java, JavaScript, TypeScript, Go, Kotlin, Swift, Rust, Python, PHP, Ruby, Perl, Shell/Bash, HTML, CSS, and more.
- **Regex-Based Comment Removal**:  
  Removes single-line and multi-line comments using hand-crafted regular expressions.
- **Basic Code Formatting**:  
  For curly-brace languages, a simple reindentation algorithm is applied. For others, trailing whitespace is trimmed.
- **Drag-and-Drop File Upload**:  
  Paste your code or upload a file to process.
- **Copy to Clipboard & Download**:  
  One-click actions for convenience.
- **Reset Option**:  
  Changing the language dropdown automatically resets the code areas, and you can also click the Reset button.

## How to Use

1. **Download or Clone** this repository.
2. Open `index.html` in your web browser (ideally via a local server to avoid file restrictions).
3. **Select the Language** from the dropdown.
   - Changing the language will reset the input and output fields.
4. **Paste or Upload** your code in the Input Code area.
5. Click **"Remove Comments"** to process your code.
6. Use the **Copy**, **Download**, or **Reset** buttons as needed.

