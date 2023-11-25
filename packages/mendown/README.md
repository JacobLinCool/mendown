# Mendown: Next Generation Markdown Tooling

## Introduction

`Mendown` is a powerful, next-generation tool designed to enhance your Markdown documents. `Mendown` integrates advanced features like automatic image description and link validation, making it an indispensable tool for Markdown users.

## Features

- **Image Description**: Automatically generates descriptions for images in your Markdown files, utilizing OpenAI's GPT-4 Vision model.
- **Link Validation**: Checks and reports broken links in your document, ensuring the integrity of your Markdown file.

## Installation

To install `Mendown`, use the following command:

```bash
pnpm i -g mendown
```

This command installs `Mendown` globally on your system, allowing you to use it in any directory.

## Usage

To use `Mendown`, simply run it from the command line with your desired Markdown file:

```bash
mendown <file>
```

> To use `image-describer`, you must set the `OPENAI_API_KEY` environment variable to your OpenAI API key.

### Command Line Options

- `<file>`: Path to the Markdown file to convert.
- `-o, --output <file>`: Specify an output file. If not provided, `Mendown` will output to stdout.
- `-w, --write`: Enables in-place editing of the input file.
- `-t, --tool <...tools>`: Specify tools to enable. By default, all tools are enabled. Available tools are `link-probe` and `image-describer`.

### Examples

1. **Basic Usage**: Convert a Markdown file and output to stdout.
   ```bash
   mendown myfile.md
   ```

2. **Specifying an Output File**: Convert and output to a specific file.
   ```bash
   mendown myfile.md -o output.md
   ```

3. **In-Place Editing**: Edit the Markdown file directly.
   ```bash
   mendown myfile.md -w
   ```

4. **Using Specific Tools**: Only use the link-probe tool.
   ```bash
   mendown myfile.md -t link-probe
   ```

## Contributing

Contributions to `Mendown` are welcome! Visit the [GitHub repository](https://github.com/JacobLinCool/mendown) to contribute.

## License

`Mendown` is licensed under AGPL-3.0.

## Contact

For any queries or issues, please open an issue on the [GitHub issues page](https://github.com/JacobLinCool/mendown/issues).
