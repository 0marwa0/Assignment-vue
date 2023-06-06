<template>
  <div class="padding">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="order-1 order-sm-1">
          <v-col class="justify-content-space-between" style="height: 100%">
            <v-col>
              <template v-if="preview" :width="100%">
                <v-img :width="600" :height="300" aspect-ratio="1/1" cover :src="preview"></v-img>
              </template>
              <template v-else="preview">
                <v-img
                  :width="600"
                  :height="300"
                  aspect-ratio="1/1"
                  cover
                  :src="imagePlaceHolder"
                ></v-img>
              </template>
            </v-col>
            <v-file-input
              type="file"
              variant="underlined"
              accept="image/*"
              style="width: 400px"
              @change="previewImage"
              id="image"
          /></v-col>
        </v-col>
        <v-col cols="12" md="6" class="order-2 order-sm-2">
          <div class="padding">
            <inputText :handleChange="handleChange" lable="title" :value="product.title" />

            <inputText :handleChange="handleChange" lable="price" :value="product.price" />
            <label for="Category">Category:</label>
            <v-select
              v-model="selectedCategory"
              :items="categories"
              @update:modelValue="handelCategory"
              variant="underlined"
            ></v-select>

            <label for="Status">Status:</label>
            <v-select
              v-model="selectedStatus"
              :items="status"
              @update:modelValue="handelStatus"
              variant="underlined"
            ></v-select>
            <inputText
              :handleChange="handleChange"
              lable="description"
              :value="product.description"
            />
            <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>{{
              message
            }}</v-snackbar>

            <v-btn class="btn-main" @click="type === 'create' ? handleAdd() : handleUpdate()">
              Save</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { addProduct } from '../../stores/api'
import inputText from '../../components/shared/inputText.vue'
import { updateAPI } from '../../stores/api'
import axios from 'axios'
import { hasEmptyValue } from '../../stores/utilize'
import '../../assets/main.css'
export default defineComponent({
  name: 'Product',
  components: { inputText },
  mounted() {
    if (this.$route.params.type === 'edit') {
      this.getProduct()
    }
  },
  methods: {
    previewImage: function (event) {
      var input = event.target
      if (input.files) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
          this.product.image = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
    getProduct() {
      axios
        .get(`https://fakestoreapi.com/products/${this.$route.params.id}`)
        .then((response) => {
          // this.product = response.data
          // this.imagePlaceHolder = response.data.image
          // this.selectedCategory = response.data.category
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      let Store = JSON.parse(localStorage.getItem('items'))
      Store = Store.filter((item) => item.id === parseInt(this.$route.params.id))
      this.imagePlaceHolder = Store[0].image
      this.selectedCategory = Store[0].category
      this.selectedStatus = Store[0].status ? Store[0].status : 'inactive'
      this.product = Store[0]
    },
    handleUpdate() {
      updateAPI(parseInt(this.$route.params.id), JSON.parse(JSON.stringify(this.product)))
      this.$router.push('/')
    },
    handleAdd() {
      const dataToSend = JSON.parse(JSON.stringify(this.product))

      if (hasEmptyValue(dataToSend)) {
        this.message = 'Please fill all the fields'
        this.snackbar = true
      } else {
        addProduct(dataToSend)
        this.$router.push('/')
      }
    },
    handelCategory(value) {
      this.product.category = value
    },
    handelStatus(value) {
      this.product.status = value
    },
    handleChange(e, name) {
      this.product[name] = e.target.value
      console.log(name, e, 'cat')
    }
  },
  data() {
    return {
      image: null,
      preview: null,
      type: this.$route.params.type,
      snackbar: false,
      message: '',
      timeout: 3000,
      color: 'error',
      imagePlaceHolder: 'https://fakeimg.pl/400x300/?text=product image',
      selectedCategory: '',
      selectedStatus: '',
      categories: ['electronics', 'jewelery', "men's clothing", "women's clothing"],
      status: ['active', 'inactive'],
      product: {
        id: JSON.parse(localStorage.getItem('items')).length + 1,
        title: '',
        status: this.selectedStatus,
        category: this.selectedCategory,
        price: '',
        description: '',
        image: ''
      }
    }
  }
})
</script>
