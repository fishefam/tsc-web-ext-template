# Web Extension Template

## Introduction

This template is designed for building web extensions using TypeScript and Web-Ext. It supports development for both Chromium-based browsers and Firefox.

## Features

- TypeScript for scalable and maintainable code.
- Web-Ext for streamlined development and testing.
- Compatibility with Chromium and Firefox browsers.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Basic understanding of TypeScript and web extension development.

### Installation

1. Clone the repository: `git clone [repository-url]`
2. Navigate to the project directory: `cd [project-name]`
3. Install dependencies: `npm install`

## Usage

### Building Extensions

- **For Firefox**: Run `npm run build:ff` to build the Firefox extension.
- **For Chromium**: Run `npm run build:cm` to build the Chromium extension.

### Development Mode

- **Firefox Only**: Run `npm run dev` to start the development mode with file watching. This is currently only supported for Firefox.

## Structure

The template has a organized structure in the `src/` directory, catering to different browser types and shared utilities.

- `src/`
  - `chromium/`: Contains specific files for Chromium-based browser extensions.
    - `manifest.json`: Manifest file for Chromium, using Manifest V3.
    - [Other specific scripts/files declared in the Chromium manifest.]
  - `firefox/`: Contains specific files for the Firefox extension.
    - `manifest.json`: Manifest file for Firefox, using Manifest V2.
    - [Other specific scripts/files declared in the Firefox manifest.]
  - `utils/`: Shared utility library or functions that can be used across both browser types.

Each browser-specific folder (`chromium` and `firefox`) contains its own `manifest.json` file and the main script files referenced in these manifests. The `utils` folder is for shared code that can be utilized by both extensions.

### Manifest Files

- The `manifest.json` in `chromium` follows the Manifest V3 structure, tailored for Chromium-based browsers.
- The `manifest.json` in `firefox` adheres to the Manifest V2 specifications, suitable for Firefox extensions.

Utility libraries or shared functions that are used by both browser types should be placed in the `utils` folder. This approach promotes code reusability and maintains organization.

## Contributing

Contributions are welcome. Please follow the existing code style and add unit tests for any new or changed functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.
