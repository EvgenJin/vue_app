<template>
  <v-content>
    <v-container grid-list-xl text-xs-center>
      <!--  registration    -->
      <v-layout row wrap justify-center>
        <v-flex xs6>
          <v-alert :value="alert_notice.on" :type="alert_notice.type">
            {{alert_notice.message}}
          </v-alert>
          <v-dialog
            v-model="dialog"
            max-width="400"
          >
            <v-form v-model="valid2">
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
                <v-btn :disabled="!valid2" @click="register">ok</v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-dialog>
        </v-flex>
      </v-layout>
      <!--   login   -->
      <v-layout row wrap justify-center>
        <v-flex xs2>
          <v-form v-model="valid">
            <v-text-field
              v-model="usr.login"
              label="login"
              :rules="[v => !!v || 'login должен быть заполнен']"
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
              <v-btn v-if="usr.exists" :disabled="!valid" @click="login(usr)">singin</v-btn>
              <v-btn v-if="alert_notice.type_error == 'user_not_exists'" @click="dialog = true">register</v-btn>
              <v-btn v-if="alert_notice.type_error == 'incorrect_password'" @click="alarma">reset password</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
    export default {
        data: ()=>({
          valid: true,
          valid2: true,
          dialog: false,
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
        methods : {
            login(object) {
                fetch('http://localhost:3000/api/user/login', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(object)
                })
                .then(res => {
                  if (res.status == 200) {
                      res.json().then(res => {
                          localStorage.setItem('jwt', res.jwt);
                          localStorage.setItem('login', this.usr.login);
                      })
                      .then(res => this.$router.push({name: 'Main'}))
                  }
                  if (res.status == 403) {
                    res.text().then(res => {
                      this.alert_notice.type_error = 'user_not_exists';
                      this.usr.exists = false;
                      this.alarma(res);
                    })
                  }
                  if (res.status == 400) {
                      res.text().then(res => {
                          this.alarma(res);
                          this.alert_notice.type_error = 'incorrect_password';
                      })
                  }
                  if (res.status == 500) {
                      console.log(res);
                      this.alarma("server error");
                  }
                })
            },
            test() {
            },
            alarma(str) {
                this.alert_notice.on = true;
                this.alert_notice.message = str;
                setTimeout(() => {
                    this.alert_notice.on = false;
                }, 3000)
            },
            register() {
                if (this.usr.password !== this.usr.password_conf) {
                    this.alarma("Пароль не совпадает");
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
                            if (res.status == 200) {
                                // this.$router.push({name: 'Login'})
                                res.text().then(res => {
                                    this.$router.go();
                                })
                            }
                            if (res.status == 400) {
                                res.text().then(res => this.alarma(res))
                            }
                            else {
                                res.text().then(res => console.log('!!!' + res))
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
