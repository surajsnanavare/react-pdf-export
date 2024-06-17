## Description

The `react-pdf-export` package is a lightweight utility designed for generating PDF documents directly from HTML components rendered in a React application. It utilizes JsPDF for PDF generation and html2canvas for rendering HTML components as images within the PDF.

## Key Features

- **Easy PDF Generation:** Convert React components into PDF documents with minimal configuration.
- **Customization Options:** Configure PDF output with options for orientation, unit, format, scaling, image type, and quality.
- **Additional Content Support:** Include text and images alongside React components in the generated PDF.
- **Flexible Integration:** Suitable for a wide range of applications requiring dynamic PDF generation from React components.

## Installation

```bash
npm install react-pdf-export
```

## Usage
Below are the examples of pdf generation

### Generating a Simple PDF
#### In this example, we generate a basic PDF document from two React components using default options.

```javascript
import { generatePDF } from 'react-pdf-export';

// Example usage:
const components = [
  { type: 'component', component: YourComponent1 },
  { type: 'component', component: YourComponent2 },
  // Add more components as needed
];

generatePDF(components);
```

### Customizing PDF Options
#### Here's an example where we customize the PDF generation with specific options like landscape orientation and increased scale.

```javascript
import { generatePDF } from 'react-pdf-export';

const components = [
  { type: 'component', component: Component1 },
  { type: 'component', component: Component2 }
];

const options = {
  orientation: 'l',    // Landscape orientation
  scale: 2             // Scale factor increased to 2
};

generatePDF(components, options);
```

### Adding Additional Content
#### In this example, we include additional content like text and images along with React components in the PDF.

```javascript
import { generatePDF } from 'react-pdf-export';

const components = [
  { type: 'component', component: Component1 },
  { type: 'component', component: Component2 }
];

const additionalContent = [
  { type: 'text', text: 'Additional text content' },
  {
    type: 'image',
    imageData: 'data:image/jpeg;base64,...', // Base64 encoded image data
    imageType: 'JPEG',
    width: 100,
    height: 100
  }
];

generatePDF([...components, ...additionalContent]);
```

## Options

When generating a PDF using `generatePDF(components, options)`, you can customize the output with the following options:

- **orientation**: Specifies the page orientation.
  - Values: `'p'` for portrait, `'l'` for landscape.
  - Default: `'p'`.
  
- **unit**: Specifies the unit of measurement for the PDF.
  - Values: `'mm'`, `'pt'`, `'in'`, `'px'`.
  - Default: `'mm'`.
  
- **format**: Specifies the page format.
  - Values: `'a3'`, `'a4'`, `'a5'`, `'letter'`, `'legal'`.
  - Default: `'a4'`.
  
- **scale**: Specifies the scaling factor for rendering components using html2canvas.
  - Values: Numeric value greater than 0.
  - Default: `2`.
  
- **imageType**: Specifies the image format used by JsPDF `addImage` method.
  - Values: `'JPEG'`, `'PNG'`, etc.
  - Default: `'JPEG'`.
  
- **imageQuality**: Specifies the image quality for JPEG images.
  - Values: Numeric value between 0 and 1.
  - Default: `0.95`.

### Example Usage of Options

```javascript
import { generatePDF } from 'react-pdf-export';

const components = [
  { type: 'component', component: YourComponent1 },
  { type: 'component', component: YourComponent2 },
  // Add more components as needed
];

const options = {
  orientation: 'l',      // Landscape orientation
  unit: 'in',            // Use inches as measurement unit
  format: 'letter',      // Use letter size format
  scale: 1.5,            // Increase scale factor
  imageType: 'PNG',      // Use PNG format for images
  imageQuality: 0.8      // Lower image quality for smaller file size
};

generatePDF(components, options);
```

## License

This package is licensed under the MIT License. See the LICENSE file for details.
