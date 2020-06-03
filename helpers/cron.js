const { CronJob } = require("cron");
const Product = require('../models/product')
var products


const job = new CronJob(
  "* */10 * * * *",
  async () => {
    console.log("checking top list every 10 minutes");
    var pendingUpdate = []
    var filtered = {}
    try {
      
      products = await Product.find({})

      // console.log("WHAT IS PRODUCT?");
      // console.log(products, "\n\n");

      if(products.length > 0) {
        filtered = products.filter(el => (el.topListingStatusDate !== null || el.topListingStatusDate !== ""))
        if(filtered !== undefined) {
          pendingUpdate.push(...filtered)
        }

        if(pendingUpdate.length > 0) {
          for(let i = 0; i < pendingUpdate.length; i++) {
            Product.findOneAndUpdate(
              { _id: pendingUpdate[i]._id },
              { topListingStatusDate: "" },
              () => {}
            )
          }
          console.log(`successfully updated: ${pendingUpdate.length} products`);
        }

      }
    }
    catch(error) {
      console.log(error)
    }

  },
  null,
  false,
  "Asia/Jakarta"
);

function jobStart() {
  job.start();
}
function jobStop() {
  pendingUpdate = []
  job.stop();
}

module.exports = { jobStart, jobStop };