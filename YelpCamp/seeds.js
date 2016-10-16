var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Clouds Rest",
            image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem massa, laoreet ut purus ut, vulputate molestie nunc. Praesent imperdiet fermentum turpis a congue. Nam euismod convallis accumsan. Praesent risus turpis, consectetur sit amet eros pretium, mattis congue libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et porta tellus. Cras eu velit nec nisi sagittis fringilla. Sed tristique ipsum ut massa mattis, eget sodales mauris luctus. Vestibulum vestibulum augue non nunc lobortis mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
    },
    {name: "Desert Maze",
            image: "http://camprrm.com/wp-content/uploads/2012/02/widewaters-campground-1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem massa, laoreet ut purus ut, vulputate molestie nunc. Praesent imperdiet fermentum turpis a congue. Nam euismod convallis accumsan. Praesent risus turpis, consectetur sit amet eros pretium, mattis congue libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et porta tellus. Cras eu velit nec nisi sagittis fringilla. Sed tristique ipsum ut massa mattis, eget sodales mauris luctus. Vestibulum vestibulum augue non nunc lobortis mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
    },
    {name: "Canyon Floor",
            image: "http://www.acadiamagic.com/1200px/seawall-1312.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem massa, laoreet ut purus ut, vulputate molestie nunc. Praesent imperdiet fermentum turpis a congue. Nam euismod convallis accumsan. Praesent risus turpis, consectetur sit amet eros pretium, mattis congue libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et porta tellus. Cras eu velit nec nisi sagittis fringilla. Sed tristique ipsum ut massa mattis, eget sodales mauris luctus. Vestibulum vestibulum augue non nunc lobortis mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;"
    }
]
function seedDB(){
//removes all campgrounds
Campground.remove({}, function(err){
    if (err) {
        
    }
   console.log("Removed Campgrounds");
   
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else{
    //             console.log("added campground");
    //             Comment.create({
    //                 text: "This place is great, but i wish there was internet",
    //                 author: "Homer"
    //             },function(err,comment) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
                        
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("Created A new Comment");
    //                 }
    //             });
    //         }
    //     });
    // });
});

}

module.exports = seedDB;