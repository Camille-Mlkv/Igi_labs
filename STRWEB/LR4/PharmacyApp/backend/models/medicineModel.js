const mongoose=require('mongoose');

const medicineSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      instruction: {
        type: String,
        required: true,
      },
      price: { 
        type: Number, 
        required: true,
        min: [0.01, 'Цена должна быть больше 0']
      },
      timezone: {  
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Medicine = mongoose.model("Medicine", medicineSchema);
  
  module.exports = Medicine;