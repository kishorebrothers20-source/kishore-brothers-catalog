export interface BulkProductImportRow {
  name: string;
  salt: string;
  strength: string;
  pack: string;
  companySlug: string;
  categorySlug: string;
  therapySlug: string;
  description: string;
  image?: string;
  isValid: boolean;
  errorMsg?: string;
}

export function generateCSVTemplate(): string {
  const headers = [
    'Name',
    'Salt',
    'Strength',
    'Pack',
    'CompanySlug',
    'CategorySlug',
    'TherapySlug',
    'Description',
    'ImageUrl',
  ];

  const sampleRows = [
    [
      '"Amoxicillin & Clavulanate Tablets 625mg"',
      '"Amoxicillin Trihydrate (500mg) + Potassium Clavulanate (125mg)"',
      '"625 mg"',
      '"Alu-Alu Blister 10x10"',
      '"aegis-biopharma"',
      '"oral-tablets"',
      '"anti-infectives"',
      '"High-potency broad-spectrum antibiotic combination."',
      '"/products/amoxicillin.png"',
    ],
    [
      '"Amlodac 5mg Tablets"',
      '"Amlodipine Besylate"',
      '"5 mg"',
      '"Blister Strip 10x15"',
      '"cipla"',
      '"oral-tablets"',
      '"cardiovascular"',
      '"Calcium channel blocker indicated for essential hypertension."',
      '"/products/amlodac.png"',
    ],
  ];

  return [headers.join(','), ...sampleRows.map(row => row.join(','))].join('\n');
}

export function downloadCSVTemplate() {
  const csvContent = generateCSVTemplate();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'pharma_products_bulk_import_template.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function parseCSVText(csvText: string): BulkProductImportRow[] {
  const lines = csvText.split(/\r\n|\n/).filter(line => line.trim() !== '');
  if (lines.length <= 1) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const rows: BulkProductImportRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 3) continue;

    const rowObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowObj[header] = values[index] ? values[index].trim() : '';
    });

    const name = rowObj['name'] || rowObj['productname'] || rowObj['product'] || '';
    const salt = rowObj['salt'] || rowObj['saltcomposition'] || rowObj['ingredient'] || '';
    const strength = rowObj['strength'] || rowObj['dose'] || '';
    const pack = rowObj['pack'] || rowObj['packsize'] || rowObj['packaging'] || '';
    const companySlug = rowObj['companyslug'] || rowObj['company'] || 'aegis-biopharma';
    const categorySlug = rowObj['categoryslug'] || rowObj['category'] || 'oral-tablets';
    const therapySlug = rowObj['therapyslug'] || rowObj['therapy'] || 'anti-infectives';
    const description = rowObj['description'] || rowObj['desc'] || 'Pharmaceutical formulation';
    const image = rowObj['imageurl'] || rowObj['image'] || '';

    let isValid = true;
    let errorMsg = '';

    if (!name) {
      isValid = false;
      errorMsg = 'Missing product name';
    } else if (!salt) {
      isValid = false;
      errorMsg = 'Missing salt composition';
    }

    rows.push({
      name,
      salt,
      strength,
      pack,
      companySlug: companySlug.toLowerCase().replace(/\s+/g, '-'),
      categorySlug: categorySlug.toLowerCase().replace(/\s+/g, '-'),
      therapySlug: therapySlug.toLowerCase().replace(/\s+/g, '-'),
      description,
      image,
      isValid,
      errorMsg,
    });
  }

  return rows;
}

function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(cur.replace(/^"|"$/g, ''));
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur.replace(/^"|"$/g, ''));
  return result;
}
