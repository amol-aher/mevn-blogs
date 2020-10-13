<template>
  <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style='min-width: 320px;'>
    <h4 class="fw-300 c-grey-900 mB-40">Login</h4>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label class="text-normal text-dark">Email</label>
        <input type="email" id="email" class="form-control" placeholder="Email" v-model="login.email" />
      </div>
      <div class="form-group">
        <label class="text-normal text-dark">Password</label>
        <input type="password" id="password" class="form-control" placeholder="Password" v-model="login.password" />
      </div>
      <div class="form-group">
        <div class="peers ai-c jc-sb fxw-nw">
          <div class="peer">
            <button class="btn btn-primary" type="submit">Sign in</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: 'Login-View',
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post('/users/login', this.login)
        let token = response.data.token
        localStorage.setItem('jwt', token)
        if (token) {
          swal('Success', 'Login successful', "success")
          this.$router.push('/admin')
        }
      } catch( error ) {
        swal('Error', 'Something went wrong', 'error')
        console.log(error)
      }
    }
  }
}
</script>