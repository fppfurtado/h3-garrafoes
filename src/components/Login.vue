<script>
    import * as firebase from '../firebaseConfig.js'
    import { 
        GoogleAuthProvider, 
        getAuth, 
        signInWithRedirect, 
        getRedirectResult ,
        onAuthStateChanged,
        signOut
    } from "firebase/auth";

    const auth = getAuth();
    
    export default {
        data() {
            return {
                nome:'(não logado)',
                email: '(não logado)'
            }
        },
        methods: {
            fazerLogin() {
            
                const provider = new GoogleAuthProvider();
    
                signInWithRedirect(auth, provider);
                
                
            },
            fazerLogout() {
                signOut(auth)
                .catch((error) => {
                    console.log("erro no logout: "+error);
                });
            },
            atualizarUsuario(user) {
                if(user) {
                    this.nome = user.displayName;
                    this.email = user.email;
                } else {
                    this.nome = '(não logado)';
                    this.email = '(não logado)';
                }
                
            }
        },
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.atualizarUsuario(user);
            })
        }
    }
    
</script>

<template>
    <h1>Testando Login</h1>
    <div>
        <button v-on:click="fazerLogin">Login</button>
    </div>
    <div>
        <button v-on:click="fazerLogout">Logout</button>
    </div>        
    <p>NOME: {{ nome }}</p>
    <p>EMAIL: {{ email }}</p>
</template>