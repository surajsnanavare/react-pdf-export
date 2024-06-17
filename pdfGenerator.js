import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const convertToPdf = (contentObjects, options = {}) => {
    const {
        orientation = "p", // default: portrait ("p"), use "l" for landscape
        unit = "mm", // default: millimeters
        format = "a4", // default: A4
        scale = 2, // default: 2 (for html2canvas)
        imageType = "PNG", // default: PNG (for jsPDF addImage)
        imageQuality = 1.0 // default: 1.0 (for jsPDF addImage)
    } = options;

    const pdf = new JsPDF(orientation, unit, format);
    let position = 10;

    const addComponentToPDF = (component, callback) => {
        const input = component.ref.current;

        html2canvas(input, { scale }).then((canvas) => {
            const imgData = canvas.toDataURL(`image/${imageType}`, imageQuality);
            const imgWidth = pdf.internal.pageSize.getWidth() - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, imageType, 10, position, imgWidth, imgHeight);

            if (position + imgHeight > pdf.internal.pageSize.getHeight() - 10) {
                pdf.addPage();
                position = 10;
            } else {
                position += imgHeight + 10;
            }

            if (callback) {
                callback();
            }
        });
    };

    const addContentToPDF = (content) => {
        if (content.type === "text") {
            pdf.text(content.text, 15, position + 10);
            position += 20; // Increase position for spacing after text
        } else if (content.type === "image") {
            pdf.addImage(content.imageData, content.imageType, 15, position, content.width, content.height);
            position += content.height + 10; // Increase position for spacing after image
        } else {
            console.error(`Unsupported content type: ${content.type}`);
        }
    };

    const processContentObject = (index) => {
        if (index >= contentObjects.length) {
            pdf.save("document.pdf");
            return;
        }

        const contentObject = contentObjects[index];

        if (contentObject.type === "component") {
            addComponentToPDF(contentObject.component, () => {
                processContentObject(index + 1);
            });
        } else {
            addContentToPDF(contentObject);
            processContentObject(index + 1);
        }
    };

    processContentObject(0);
};

export default convertToPdf;
