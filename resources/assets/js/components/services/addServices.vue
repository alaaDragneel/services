<template>
    <div class="form-group">
      <label for="name">Service Name</label>
      <input type="text" class="form-control" id="name" name="name" v-model="name" placeholder="Enter the Service Name">
    </div>

    <div class="form-group">
      <label for="description">Service Description</label>
      <textarea class="form-control" id="description" name="description" v-model="description" rows="10" placeholder="Enter the Service description"></textarea>
    </div>

    <div class="form-group">
        <label for="category_id">Service Category</label>
        <select class="form-control" id="category_id" name="category_id" v-model="category_id">
            <option value="1">Category 1</option>
        </select>
    </div>

    <div class="form-group">
        <label for="price">Service Price</label>
        <select class="form-control" id="price" name="price" v-model="price">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
    </div>

    <div class="form-group">
      <label for="image">Service image</label>
      <input type="file" v-el:image>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary" @click="AddThisService">
          <i class="fa fa-plus"></i> Add Service
      </button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                name: '',
                description: '',
                category_id: '',
                price: ''
            }
        },
        methods: {
            AddThisService: function() {
                var formData = new FormData();
                formData.append('name', this.name);
                formData.append('desc', this.description);
                formData.append('cat_id', this.category_id);
                formData.append('price', this.price);
                formData.append('image', this.$els.image.files[0]);

                console.log(this.$els.image.files[0]);
                return false;
                this.sendData(formData);
            },
            sendData: function (formData) {
                this.$http.post('/Services', formData).then(function(successResponse) {
                    if(successResponse.body == 'done') {
                        alert('your service has been added Please wait until admin approved');
                        this.name = '';
                        this.description = '';
                        this.category_id = '';
                        this.price = '';
                    } else {

                    }
                }, function (errorResponse) {

                });
            }
        }
    }
</script>
