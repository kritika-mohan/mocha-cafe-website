import fs from 'fs';
import path from 'path';
import https from 'https';

const menuItems = [
  'Espresso Noir', 'Mocha Royale', 'Caramel Macchiato', 'Cold Brew Reserve', 'Café Latte',
  'Hazelnut Cappuccino', 'Iced Matcha Latte', 'Rose Cardamom Chai', 'Dark Chocolate Frappe',
  'Mango Lassi', 'Watermelon Mint Cooler', 'Golden Turmeric Milk',
  'Crispy Corn Chaat', 'Paneer Tikka', 'Chicken Wings', 'Loaded Nachos', 'Mushroom Bruschetta',
  'Fish Fingers', 'Onion Rings Tower', 'Stuffed Jalapeños', 'Caesar Salad', 'Dahi Ke Sholay',
  'Smoked Salmon Blini', 'Veg Spring Rolls',
  'Butter Chicken', 'Paneer Makhani', 'Mocha Club Sandwich', 'Spaghetti Arrabbiata', 'Dal Makhani',
  'Grilled Sea Bass', 'Chicken Biryani', 'BBQ Mushroom Burger', 'Lamb Rogan Josh', 'Thai Green Curry',
  'Rajma Chawal', 'Pesto Risotto',
  'Chocolate Fondant', 'Gulab Jamun Cheesecake', 'Tiramisu', 'Mango Panna Cotta', 'Belgian Waffle',
  'Kulfi Falooda', 'Crème Brûlée', 'Banana Nutella Crepe', 'Rasgulla Trifle', 'Lemon Tart',
  'Ice Cream Sundae', 'Brownie à la Mode',
  'Mocha Masala Maggi', 'Maggi Cheese Volcano'
];

const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const downloadImage = (name) => {
  return new Promise((resolve, reject) => {
    const filename = name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.jpg';
    const filePath = path.join(imagesDir, filename);
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`Exists: ${filename}`);
      return resolve();
    }

    const prompt = encodeURIComponent(`${name}, luxury cafe aesthetic, high quality food photography, appetizing`);
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=400&height=300&nologo=true`;

    https.get(url, (res) => {
      if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 301) {
        // If redirect, we should ideally follow it, but pollinations usually returns the image directly 
        // or redirects to an AWS bucket. Let's handle simple redirects if needed.
        const imageUrl = res.headers.location || url;
        
        https.get(imageUrl, (imageRes) => {
            const fileStream = fs.createWriteStream(filePath);
            imageRes.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              console.log(`Downloaded: ${filename}`);
              resolve();
            });
        }).on('error', reject);
      } else {
        reject(new Error(`Failed to download ${name}: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadAll() {
  console.log(`Starting download of ${menuItems.length} images sequentially...`);
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    console.log(`[${i+1}/${menuItems.length}] Fetching ${item}...`);
    try {
      await downloadImage(item);
      await sleep(1500); // 1.5 second delay between requests
    } catch (err) {
      console.log(`Error on ${item}: ${err.message}. Retrying...`);
      await sleep(3000); // Wait 3 seconds
      try {
        await downloadImage(item);
      } catch (err2) {
        console.log(`Failed twice on ${item}: ${err2.message}`);
      }
    }
  }
  console.log('All images downloaded successfully!');
}

downloadAll().catch(console.error);
