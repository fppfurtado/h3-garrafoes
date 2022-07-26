<script>

    import firebase from '../firebaseConfig';
    import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
    
    const db = getFirestore(firebase);
    
    export default {
        data() {
            return {
                data:'',
                placa:'',
                bom_para_envase:'',
                retorno_vazio:'',
                entrada_cheio:'',
                troca_perda:''
            }
        },
        methods: {

        },
        async mounted() {

            const querySnapshot = await getDocs(collection(db, "romaneio"));

            console.log(querySnapshot.docs[0].data());

            var romaneio = querySnapshot.docs[0].data();

            this.data = romaneio.data;
            this.placa = romaneio.placa;
            this.bom_para_envase = romaneio.bom_para_envase;
            this.retorno_vazio = romaneio.retorno_vazio;
            this.entrada_cheio = romaneio.entrada_cheio;
            this.troca_perda = romaneio.troca_perda;

        }
    }

</script>

<template>

    <h1>Cadastro de Romaneio</h1>

    <input id="id" type="hidden" />
    
    <label for="data">DATA/HORA:</label>
    <input id="data" name="data" type="datetime-local" v-model="data" /><br />

    <label for="placa">PLACA VEÍCULO:</label>
    <select id="placa" name="placa">
    <option id="hyd" value="HYD-2A18">HYD-2A18</option>
    <option id="jvw" value="JVW-7464">JVW-7464</option>
    </select> <br />

    <label for="itemA">(A) BOM PARA ENVASE:</label>
    <input id="itemA" name="A" type="number" min="0" v-model="bom_para_envase" /><br />

    <label for="itemB">(B) RETORNO VAZIO:</label>
    <input id="itemB" name="B" type="number" min="0" v-model="retorno_vazio" /><br />

    <label for="itemC">(C) ENTRADA CHEIO:</label>
    <input id="itemC" name="C" type="number" min="0" v-model="entrada_cheio" /><br />

    <label for="itemH">(H) TROCA (PERDA):</label>
    <input id="itemH" name="H" type="number" min="0" v-model="troca_perda"/><br />

    <label for="itemI">(I) CHEIO (À FATURAR):</label>
    <input id="itemI" name="I" type="number" min="0" disabled /><br />

    <button type="button" onclick="gravarRomaneio()">gravar</button>
    <button type="button" onclick="excluirRomaneio()">excluir</button>
        
</template>