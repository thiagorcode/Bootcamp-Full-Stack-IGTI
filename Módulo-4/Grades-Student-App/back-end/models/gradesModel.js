export default (mongoose) => {
   const schema = mongoose.Schema({
      name: {
         type: String,
         required: true,
      },
      subject: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         required: true,
      },
      value: {
         type: Number,
         required: true,
         validate(value) {
            if (value < 0) throw new Error("Valor não permitido!!");
         },
      },
      lastModified: {
         type: Date,
         required: true,
         default: Date.now,
      }
   })

   schema.method('toJSON', function () {
      const { __V, _id, ...object } = this.toObject();

      object.id = _id;

      return object;
   })

   const gradesSchema = mongoose.model("grades", schema, "grades");


   return gradesSchema
}