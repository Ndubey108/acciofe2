

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

fetch(corsProxyUrl + apiUrl)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));


async function fetchDataWithAsync() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log(error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById("tabledata");
  

  data.forEach((coin) => {
    const row = document.createElement("tr");
    const percentchange=coin.price_change_percentage_24h;
    const percentagechangeclass=percentchange>0?'positive':'negative';
    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.id}</td>
      <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price}</td>
      <td>MKT Cap:${coin.total_volume}</td>
      <td class="${percentagechangeclass}">${coin.price_change_percentage_24h}</td>
    `;
    tableBody.appendChild(row);
  });
}
const search=document.getElementById("search");
search.addEventListener('click',()=>{
    const searchvalue=document.getElementById("text").value;
    const searchterm=searchvalue.toLowerCase();
    const filtereddata=data.filter(item=>{
        return item.name.toLowerCase().includes(searchterm);
    })
    renderTable(filtereddata);
})
function smkt(){
   const sorteddata1= data.sort((a,b)=>{
        return b.total_volume-a.total_volume;
    })
    renderTable(sorteddata1)
}
function sbp(){
    const sorteddata2= data.sort((a,b)=>{
         return b.price_change_percentage_24h-a.price_change_percentage_24h;
     })
     renderTable(sorteddata2)
 }