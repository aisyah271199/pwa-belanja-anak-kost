// Ambil elemen div
const katalog = document.getElementById('katalog');

// Data dummy katalog belanja anak kost
const daftarBelanja = [
  'Beras 5 kg',
  'Mie Instan 1 dus',
  'Telur 1 kg',
  'Sabun Mandi',
  'Pasta Gigi',
  'Minyak Goreng 2 liter',
  'Teh Celup',
  'Gula Pasir 1 kg',
  'Kopi Sachet',
  'Detergen 1 kg'
];

// Render ke halaman
let output = '<ul>';
daftarBelanja.forEach(item => {
  output += <li>${item}</li>;
});
output += '</ul>';

katalog.innerHTML = output;
