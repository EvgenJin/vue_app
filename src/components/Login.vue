<template>
  <v-container fluid>
      <snackbar_alert/>
      <v-container fluid>
        <v-row class="justify-center">
          <v-form v-model="valid_login">
            <v-text-field
              v-model="usr.login"
              label="login"
              :rules="[v => !!v || 'login должен быть заполнен',
                       v => /[a-zA-Z0-9]+/.test(v) || 'login только латиница']"
              required
            ></v-text-field>
            <v-text-field
              v-on:keyup.enter="login(usr)"
              v-model="usr.password"
              type="password"
              label="password"
              :rules="[v => !!v || 'password должен быть заполнен']"
              required
            ></v-text-field>
            <!-- login если валидация прошла -->
            <v-col cols="12" xs="12">
              <v-btn v-if="usr.exists" :disabled="!valid_login" @click="login(usr)">singin</v-btn>
            </v-col>
            <!-- регистрация если пользователь не найден -->
              <v-btn v-if="alert_notice.type_error == 'user_not_exists'" @click="dialog_reg = true">register</v-btn>
            <!-- сброс пароля если не проходит аутентификацию -->
              <v-btn v-if="alert_notice.type_error == 'incorrect_password'" @click="bus.$emit('snackbar_alert',{str:'asd',type:'error'});">reset password</v-btn>
          </v-form>
        </v-row>
      <!--  end login form  -->
      <!--  registration  form  поднимется когда dialog_reg = true-->
          <v-dialog
            v-model="dialog_reg"
            max-width="400"
          >
            <v-form v-model="valid_reg">
              <v-card>
                <v-card-title class="justify-center">
                  <span>Подтверждение регистрации</span>
                </v-card-title>
                <v-row class="justify-center">
                  <v-col sm="10">
                    <v-text-field
                      v-model="usr.name"
                      solo
                      :rules="[v => !!v || 'Имя должно быть заполнено']"
                      label="Имя">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col sm="10">
                    <v-text-field
                      v-model="usr.password_conf"
                      type="password"
                      solo
                      :rules="[v => !!v || 'password должен быть заполнен']"
                      label="Повторите пароль">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions class="justify-center">
                  <v-btn :disabled="!valid_reg" @click="register">ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
      <!-- end registration  form-->
    </v-container>
  </v-container>
<!--  </v-content>-->
</template>

<script>
    import snackbar_alert from "./common/snackbar_alert";
    import {bus} from "../main";
    export default {
        data: ()=>({
          valid_login: true,
          valid_reg: true,
          dialog_reg: false,
          alert_notice: {
              message: null,
              on: false,
              type: "error",
              type_error: null
          },
          usr: {
              exists: true,
              login : '',
              name: '',
              password : '',
              password_conf: ''
          },
        }),
        components: {
            snackbar_alert
        },
        methods : {
            login(user_data) {
                fetch('http://localhost:3000/api/user/login', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user_data)
                })
                .then(res => {
                  // аутентификация прошла успешно
                  if (res.status == 200) {
                      res.json().then(res => {
                          localStorage.setItem('jwt', res.jwt);
                          localStorage.setItem('login', this.usr.login);
                      })
                      .then(res => this.$router.push({name: 'Main'}))
                  }
                  // пользователь не найден user_not_exists
                  if (res.status == 403) {
                    res.text().then(res => {
                      this.alert_notice.type_error = 'user_not_exists';
                      this.usr.exists = false;
                      bus.$emit('snackbar_alert',{str:res,type:'error'});
                    })
                  }
                  // пароль не верный incorrect_password
                  if (res.status == 400) {
                    res.text().then(res => {
                      bus.$emit('snackbar_alert',{str:res,type:'error'});
                      this.alert_notice.type_error = 'incorrect_password';
                    })
                  }
                  // сломалось на сервере
                  if (res.status == 500) {
                      console.log(res);
                      bus.$emit('snackbar_alert',{str:res,type:'error'});
                  }
                })
            },
            register() {
              if (this.usr.password !== this.usr.password_conf) {
                  bus.$emit('snackbar_alert',{str:'Пароль не совпадает',type:'error'});
              }
              else {
                let object = {
                  login: this.usr.login,
                  password: this.usr.password,
                  name: this.usr.name
                };
                fetch('http://localhost:3000/api/user/register', {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(object)
                })
                .then(res => {
                  // регистрация прошла успешно - обновить страницу
                  if (res.status == 200) {
                    res.text().then(res => {
                        this.$router.go();
                    })
                  }
                  if (res.status == 400) {
                    // Ошибка регистрации
                    res.text().then(res => bus.$emit('snackbar_alert',{str:res,type:'error'}))
                  }
                  else {
                    res.text().then(res => bus.$emit('snackbar_alert',{str:res,type:'error'}))
                  }
                })
              }
            }
        }
    }
</script>

