cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.monday.contact-chooser/www/ContactChooser.js",
        "id": "com.monday.contact-chooser.ContactChooser",
        "clobbers": [
            "ContactChooser"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.simonmacdonald.telephonenumber": "1.0.0",
    "com.monday.contact-chooser": "0.2"
}
// BOTTOM OF METADATA
});