import { SampleResume } from '../types/resume';

/**
 * Generates a realistic visual resume image (PNG Data URL) for Photo Scan, PDF Document,
 * or Executive DOCX preview and multimodal testing.
 */
export function generateVisualResumeDataUrl(
  sample: Pick<
    SampleResume,
    'name' | 'role' | 'location' | 'email' | 'phone' | 'linkedin' | 'resumeText' | 'visualStyle'
  >
): string {
  const canvas = document.createElement('canvas');
  const width = 900;
  const height = 1180;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const isCameraScan = sample.visualStyle === 'camera-photo';
  const isExecutive = sample.visualStyle === 'executive-docx';

  // Background
  if (isCameraScan) {
    // Desk backdrop for photo scan
    const deskGrad = ctx.createLinearGradient(0, 0, width, height);
    deskGrad.addColorStop(0, '#1e293b');
    deskGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = deskGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle desk grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 36) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.save();
    // Slight camera angle transform
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-0.008);
    ctx.translate(-width / 2, -height / 2);

    // Drop shadow of physical paper
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 12;

    // Warm paper surface
    const paperGrad = ctx.createLinearGradient(44, 36, width - 44, height - 36);
    paperGrad.addColorStop(0, '#fdfcf7');
    paperGrad.addColorStop(0.5, '#f8f6ef');
    paperGrad.addColorStop(1, '#f1ede2');
    ctx.fillStyle = paperGrad;
    ctx.fillRect(44, 36, width - 88, height - 72);
    ctx.restore();
  } else {
    // Clean PDF / DOCX sheet
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  const marginX = isCameraScan ? 92 : 64;
  let cursorY = isCameraScan ? 96 : 68;
  const contentWidth = width - marginX * 2;

  // Top accent bar for PDF / Executive style
  if (!isCameraScan) {
    ctx.fillStyle = isExecutive ? '#0f172a' : '#4f46e5';
    ctx.fillRect(0, 0, width, 10);
  }

  // Header: Candidate Name
  ctx.fillStyle = '#0f172a';
  ctx.font = isExecutive
    ? 'bold 30px Georgia, serif'
    : 'bold 28px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(sample.name.toUpperCase(), marginX, cursorY);

  // Role subtitle
  cursorY += 26;
  ctx.fillStyle = isExecutive ? '#334155' : '#4338ca';
  ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(sample.role, marginX, cursorY);

  // Contact line
  cursorY += 22;
  ctx.fillStyle = '#475569';
  ctx.font = '400 12px "JetBrains Mono", monospace';
  const contactLine = `${sample.location}  |  ${sample.phone}  |  ${sample.email}  |  ${sample.linkedin}`;
  ctx.fillText(contactLine, marginX, cursorY, contentWidth);

  // Divider line
  cursorY += 16;
  ctx.strokeStyle = isExecutive ? '#0f172a' : '#cbd5e1';
  ctx.lineWidth = isExecutive ? 2 : 1.5;
  ctx.beginPath();
  ctx.moveTo(marginX, cursorY);
  ctx.lineTo(width - marginX, cursorY);
  ctx.stroke();

  cursorY += 24;

  // Parse lines from resumeText (skip the first 2 lines which are name & contact)
  const rawLines = sample.resumeText.split('\n');
  const bodyLines = rawLines.slice(2);

  const sectionHeaders = new Set([
    'PROFESSIONAL SUMMARY',
    'EXECUTIVE PROFILE',
    'SUMMARY',
    'ARCHITECTURAL SUMMARY',
    'RESEARCH & ENGINEERING SUMMARY',
    'TECHNICAL SKILLS',
    'CORE COMPETENCIES',
    'SKILLS',
    'CORE STACK & CERTIFICATIONS',
    'WORK EXPERIENCE',
    'EXPERIENCE',
    'WORK HISTORY',
    'PROFESSIONAL EXPERIENCE',
    'EDUCATION',
    'EDUCATION & CERTIFICATIONS',
    'EDUCATION & CREDENTIALS',
    'KEY PROJECTS & PUBLICATIONS',
  ]);

  const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
        if (currentY > height - (isCameraScan ? 75 : 48)) break;
      } else {
        line = testLine;
      }
    }
    if (currentY <= height - (isCameraScan ? 75 : 48)) {
      ctx.fillText(line.trim(), x, currentY);
      currentY += lineHeight;
    }
    return currentY;
  };

  for (const rawLine of bodyLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      cursorY += 6;
      continue;
    }
    if (cursorY > height - (isCameraScan ? 80 : 52)) break;

    if (sectionHeaders.has(trimmed.toUpperCase())) {
      cursorY += 8;
      ctx.fillStyle = isExecutive ? '#0f172a' : '#312e81';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(trimmed.toUpperCase(), marginX, cursorY);

      cursorY += 6;
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marginX, cursorY);
      ctx.lineTo(width - marginX, cursorY);
      ctx.stroke();
      cursorY += 18;
    } else if (trimmed.includes('|') && !trimmed.startsWith('-')) {
      // Job title / company line
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      cursorY = wrapText(trimmed, marginX, cursorY, contentWidth, 18);
    } else if (
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)/i.test(trimmed) &&
      trimmed.length < 42
    ) {
      // Date line
      ctx.fillStyle = '#64748b';
      ctx.font = '500 11.5px "JetBrains Mono", monospace';
      cursorY = wrapText(trimmed, marginX, cursorY, contentWidth, 17);
    } else if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      // Bullet point
      ctx.fillStyle = '#1e293b';
      ctx.font = '400 12.5px "Plus Jakarta Sans", sans-serif';
      const bulletContent = trimmed.replace(/^[-•]\s*/, '');
      ctx.fillText('•', marginX + 4, cursorY);
      cursorY = wrapText(bulletContent, marginX + 18, cursorY, contentWidth - 18, 17.5);
    } else {
      ctx.fillStyle = '#334155';
      ctx.font = '400 12.5px "Plus Jakarta Sans", sans-serif';
      cursorY = wrapText(trimmed, marginX, cursorY, contentWidth, 17.5);
    }
  }

  // If camera photo scan, add subtle lighting vignette at corners
  if (isCameraScan) {
    const radGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width * 0.35,
      width / 2,
      height / 2,
      width * 0.75
    );
    radGrad.addColorStop(0, 'rgba(0,0,0,0)');
    radGrad.addColorStop(1, 'rgba(15, 23, 42, 0.22)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL('image/jpeg', 0.88);
}

/**
 * Compresses and normalizes an uploaded image/photo file on the client so
 * Gemini multimodal OCR runs in < 5 seconds instead of uploading raw 10MB+ camera photos.
 */
export async function compressImageFile(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<{ base64: string; mimeType: string; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onerror = () => {
        // Fallback if browser cannot decode (e.g. HEIC/TIFF): send raw base64
        const rawBase64 = dataUrl.split(',')[1] || '';
        resolve({
          base64: rawBase64,
          mimeType: file.type || 'image/jpeg',
          dataUrl,
        });
      };
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const rawBase64 = dataUrl.split(',')[1] || '';
          resolve({ base64: rawBase64, mimeType: file.type || 'image/jpeg', dataUrl });
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        const compressedBase64 = compressedDataUrl.split(',')[1] || '';
        resolve({
          base64: compressedBase64,
          mimeType: 'image/jpeg',
          dataUrl: compressedDataUrl,
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Cleans HTML, RTF, JSON, XML, or plain text into clean readable resume text on the client.
 */
export function normalizeTextFormat(rawContent: string, extension: string): string {
  const ext = extension.toLowerCase();
  if (ext === 'html' || ext === 'htm' || ext === 'xml') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawContent, 'text/html');
    return (doc.body?.innerText || rawContent).replace(/\n{3,}/g, '\n\n').trim();
  }
  if (ext === 'rtf') {
    return rawContent
      .replace(/\\par[d]?/g, '\n')
      .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  if (ext === 'json') {
    try {
      const obj = JSON.parse(rawContent);
      return JSON.stringify(obj, null, 2);
    } catch {
      return rawContent;
    }
  }
  return rawContent.trim();
}
