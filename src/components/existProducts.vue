<template>
  <div>
    <div class="all-products">
      <oneProduct v-for="p in allProducts" :key="p.code" :code="p.code" :name="p.name" :description="p.description"
        @changedProducts="initProducts()" :image="p.router" :startDate="p.startdate">
      </oneProduct>
    </div>
    
    <div class="wrap-input">
      <h3>הוספת מוצר</h3>
      
      <input placeholder="שם" type="text" id="name" name="name" class="input" v-model="newName"> 
      <input placeholder="תיאור" type="text" id="description" class="input" name="description"
        v-model="newDescription"> 
        <button class="button-1 big" @click="addProduct()">הוסף</button>
        <button class="button-1 big" @click="fieldToSort=-1; initProducts()">מיון לפי קוד</button>
        <button class="button-1 big" @click="fieldToSort=1; initProducts()">מיון לפי שם</button>
        <button class="button-1 big" @click="fieldToSort=2; initProducts()">מיון לפי תאור</button>

        <input placeholder="חיפוש לפי קוד" type="text"  
         class="input" v-model="filterCode" @keyup="onPress()"> 
      
        <input placeholder="חיפוש לפי שם" type="text"  
         class="input" v-model="filterName" @keyup="onPress()"> 
       
    </div>
  </div>
</template>

<script>
 
import oneProduct from "./oneProduct.vue";

import httpMixin from './../mixins/httpMixin';

export default {
  mixins: [httpMixin],
  props: {},
  data: function () {
    return {
      sourceProducts:[],
      products: [],
      fieldToSort: -1,
      newDescription: '',
      newName: '',
      filterCode:'',
      filterName:''
    };
  },
  components: {
    oneProduct,
  },
  created() {
    this.initProducts();
  },
  computed: {
    allProducts() {
      return this.products;
    } 
  },
  methods: {
    initProducts() {
     setTimeout(() => {
      this.getProducts(this.fieldToSort).then((products) => { 
        this.sourceProducts = products;
        this.products = products;
        this.filterProducts();
      });
     }, 100);
     
    },
    addProduct() {

      this.addOneProduct(this.newName, this.newDescription).then(() => {
        this.initProducts();
      });

    },
    filterProducts(){
      this.initProducts();
      this.products = this.sourceProducts;
        this.products = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.filterName.toLowerCase()) 
        && product.code.toString().toLowerCase().includes(this.filterCode.toLowerCase()) 
        );
    },
    onPress(){
      this.filterProducts()
    },
    
  },
};
</script>
