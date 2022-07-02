const axios = require('axios').default;
const fs = require("fs");

const MANUAL=require('./arrayManual');



const { response } = require('express');
const express = require('express')
const app = express()
const port = 3001

const itemSearch='shop-masks-filters';
const site="https://www.lazada.com.my"

// const site_end="/?ajax=true&page=1&spm=a2o42.searchlistcategory.cate_5.1.46281e22mYNSDT";

app.get('/', async (req, res) => {

    const page=req.query.page;

    let x=0;

    // fs.appendFile(
    //     `./result/lazadaScrapeResult.txt`,
    //     `[`,
    //     function(err) {
    //         if (err) throw err;
    //         console.log("OK",x);
    //     },
    // );

        await axios.get(`${site}/${itemSearch}/?ajax=true&page=${page}&spm=a2o4k.searchlistcategory.search.go.33d33b12jyU0qD`)
        .then(async function (response) {

            await response.data.mods.listItems.forEach(async item=>{
                x++;
                const itemPack={
                    name:item.name,
                    brandName:item.brandName,
                    image:item.image,
                    originalPrice:item.originalPrice,
                    price:item.price,
                    discount:item.discount,
                    location:item.location,
                    url:`https:${item.itemUrl}`
                }
                fs.appendFile(
                    `./result/lazadaScrapeResult.txt`,
                    `${JSON.stringify(itemPack)},\r\n`,
                    function(err) {
                        if (err) throw err;
                        console.log("OK",x);
                    },
                );
            })
            
            await res.status(200).send('OK');

        })
        .catch(function (error) {
            res.status(400).send(error);
        })

    // fs.appendFile(
    //     `./result/lazadaScrapeResult.txt`,
    //     `]`,
    //     function(err) {
    //         if (err) throw err;
    //         console.log("OK",x);
    //     },
    // );


    


})

app.get('/manual', async (req, res) => {

    res.status(200).send(MANUAL);


})



app.listen(port, () => {
  console.log(`Imran's Lazada Scraper ${port}`)
})




function axiosData(){
    return new Promise((resolve,reject)=>{
        
    })
}