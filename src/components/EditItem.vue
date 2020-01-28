<template>
  <v-content>
    <v-container grid-list-xl text-xs-center>
        <h1>111111</h1>
    </v-container>
</v-content>
</template>


<script>
    export default {
        data: ()=>({
            valid: true,
        }),
        methods : {
            test() {
                this.$router.push({name: 'HelloWorld'})
            }            
        }
    }
</script>    
