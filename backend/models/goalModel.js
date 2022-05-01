const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User", //reference to Model which the data is coming from (relation between goal and user)
    },
    text: {
      type: String,
      required: [true, "Please include a text value"],
    },
  },
  { timestamps: true } //Automatically creats 'Created at' and 'Updated at' timestamps
);

module.exports = mongoose.model("Goal", goalSchema);
