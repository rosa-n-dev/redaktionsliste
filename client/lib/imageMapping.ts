// Supabase storage configuration
const SUPABASE_STORAGE_BASE_URL = 'https://dayiaqaufaorxqsuzgxn.supabase.co/storage/v1/object/public/volat.redaktionsliste.profilbilder';

// Mapping of editor names to their image file names
const IMAGE_MAPPING: { [key: string]: string } = {
  'Marc Springer': 'PP_Marc_Springer.jpg',
  'Pascal Pletsch': 'PP_Pascal_Pletsch.jpg', 
  'Martin Suppersberger': 'PP_Martin_Suppersberger.jpg',
  'Larissa Hermann': 'PP_Larissa_Hermann.jpg',
  'Valentina Dotlić': 'PP_Valentina_Dotlic.jpg', // Note: no special characters in filename
  'Paloma Mock': 'PP_Paloma_Mock.jpg',
  'Mirjam Mayer': 'PP_Mirjam_Mayer.jpg',
};

// Function to get Supabase storage URL for an editor
export function getEditorImageUrl(editorName: string): string {
  const fileName = IMAGE_MAPPING[editorName];
  
  if (!fileName) {
    console.log(`No image mapping found for: ${editorName}`);
    return '';
  }
  
  const fullUrl = `${SUPABASE_STORAGE_BASE_URL}/${fileName}`;
  console.log(`Generated image URL for ${editorName}: ${fullUrl}`);
  return fullUrl;
}

// Function to get all available editor names with images
export function getEditorsWithImages(): string[] {
  return Object.keys(IMAGE_MAPPING);
}
