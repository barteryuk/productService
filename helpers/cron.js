const { CronJob } = require("cron");
const Product = require('../models/product')
var products
var pendingUpdate
var filtered

const job = new CronJob(
  "* */5 * * * *",
  // () => {
  //   console.log("checking top list every 5 minutes");
  //   Users.get({}, (err, users) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       const pendingUpdate = [];
  //       let filtered = {};
  //       if (users.length !== 0) {
  //         filtered = users.filter((el) => el.quota < 2);
  //         if (filtered !== undefined) {
  //           pendingUpdate.push(...filtered);
  //         }
  //         if (pendingUpdate.length !== 0) {
  //           for (let i = 0; i < pendingUpdate.length; i++) {
  //             Users.updateOne(
  //               { _id: pendingUpdate[i]._id },
  //               { quota: 2 },
  //               () => {}
  //             );
  //           }
  //           console.log(`successfully updated: ${pendingUpdate.length} data`);
  //         }
  //       }
  //     }
  //   });
  // },
  async () => {
    console.log("checking top list every 5 minutes");

    try {

      products = await Product.find({})

      if(products.length != 0) {
        filtered = products.filter(el => (el.topListingStatusDate !== null || el.topListingStatusDate !== ""))
        if(filtered !== undefined) {
          pendingUpdate.push(...filtered)
        }

        if(pendingUpdate.length !== 0) {
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
    catch(err) {
      console.error(err)
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
  job.stop();
}

module.exports = { jobStart, jobStop };