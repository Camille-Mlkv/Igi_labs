const moment = require('moment-timezone');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAtUserTZ: {
        type: Date,
    },
    updatedAtUserTZ: {
        type: Date,
    },
    timezone: {  
      type: String,
      required: true,
    },
    authSource: {
      enum: ["self", "google"],
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

// userSchema.pre('save', function (next) {
//     const userTimezone = this.timezone || 'UTC'; // Используем часовой пояс, переданный от клиента, или по умолчанию 'UTC'
//     console.log("I got the timezone");
//     console.log(this.timezone)
//     const now = moment(); // Получаем текущее время с учётом часового пояса пользователя
  
//     // Получаем сдвиг в минутах для часового пояса пользователя
//     const userTimezoneOffset = moment.tz(userTimezone).utcOffset();
  
//     // Устанавливаем смещение для полей
//     this.createdAtUserTZ = new Date(now.utcOffset(userTimezoneOffset).format());
//     this.updatedAtUserTZ = new Date(now.utcOffset(userTimezoneOffset).format());
  
//     next();
//   });

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model("User", userSchema);
module.exports=User;