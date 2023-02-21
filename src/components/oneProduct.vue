<template>
  <div class="one-product">
    <h1>{{ code }}</h1>
    <h1>{{ name }}</h1>
    <h1>{{ description }}</h1>
    <h3>{{ startDate }}</h3>
     
    <img v-if="image"  :src ="imageURL" class="product-image" >

    <div class="wrap-input-2">
     
     
      <input placeholder="שם" type="text" id="name" name="name" class="input-2" v-model="newName">
      <input placeholder="תיאור" type="text" id="description" class="input-2" name="description" v-model="newDescription">
      <button class="button-1" @click="editProduct()">ערוך</button>
    </div>
    <div class="margin-5">
      <input class="button-1 file" type="file" accept="image/jpeg" @change=uploadImage>
    </div>
    <div class="delete">
      <button @click="deleteProduct()" class="button-1">מחק</button>
      <button @click="deleteIMG()" class="button-1">מחק תמונה</button>
    </div>
  </div>
</template>

<script>

import httpMixin from './../mixins/httpMixin';

export default {
  mixins: [httpMixin],
  props: {
    code: String,
    name: String,
    description: String,
    image: String,
    startDate: Date
  },
  data() {
    return {
      previewImage: null,
      newDescription: '',
      newName: ''
    }
  },

  computed: {
    imageURL(){
      return `${window._env.IMAGES_URL}/${this.image}` ;
    }
  },
  created() {
  },
  methods: {

    deleteProduct() {
      this.deleteOneProduct(this.code).then(() => {
        this.$emit('changedProducts');
      })

    },
    editProduct() {
      this.editOneProduct(this.code, this.newName, this.newDescription).then(() => {
        this.$emit('changedProducts');
      })
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        this.uploadOneImage(!this.image,this.code,image.name) .then(() => {
            this.$emit('changedProducts');
          })
        
      };
    },
    deleteIMG() {
      this.deleteIMGFromProduct(this.code).then(() => {
            this.$emit('changedProducts');
          });
    },
  },

};
</script>
