<script>

    import firebase from '../firebaseConfig';
    import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
    
    const db = getFirestore(firebase);
    
    export default {
        data() {
            return {
                romaneio: {
                    data:'',
                    placa:'',
                    bom_para_envase:'',
                    retorno_vazio:'',
                    entrada_cheio:'',
                    troca_perda:'',
                    cheio_a_faturar:''
                },
                combo_placa: {
                    options: []
                }
            }
        },
        methods: {
            carregarRomaneio(romaneio) {
                this.romaneio.data = romaneio.data.toDate().toISOString().replace('Z','');
                this.romaneio.placa = romaneio.placa;
                this.romaneio.bom_para_envase = romaneio.bom_para_envase;
                this.romaneio.retorno_vazio = romaneio.retorno_vazio;
                this.romaneio.entrada_cheio = romaneio.entrada_cheio;
                this.romaneio.troca_perda = romaneio.troca_perda;
                this.romaneio.cheio_a_faturar = romaneio.cheio_a_faturar;
            },
            carregarComboPlacas(placas) {
                placas.forEach((placa) => {
                    this.combo_placa.options.push({
                        value: placa.data().nome,
                        text: placa.data().nome
                    });
                })
            }
        },
        computed: {
            getTotalGeral() {
                return this.romaneio.cheio_a_faturar + this.romaneio.troca_perda + this.romaneio.entrada_cheio;
            }
        },
        async mounted() {

            const queryEstoques = await getDocs(collection(db, "estoques"));
            const queryRomaneios = await getDocs(collection(db, "romaneio"));
            
            //console.log(querySnapshot.docs[0].data());
            this.carregarComboPlacas(queryEstoques.docs);
            this.carregarRomaneio(queryRomaneios.docs[0].data());

        }
    }

</script>

<template>

    <h1>Cadastro de Romaneio</h1>

    <input id="id" type="hidden" />
    
    <label for="data">DATA/HORA:</label>
    <input id="data" name="data" type="datetime-local" v-model="romaneio.data" /><br />

    <label for="placa">PLACA VEÍCULO:</label>
    <select id="placa" name="placa" v-model="romaneio.placa">
        <option v-for="option in combo_placa.options" :value="option.value">
            {{ option.text }}
        </option>
    </select> <br />

    <label for="itemA">(A) BOM PARA ENVASE:</label>
    <input id="itemA" name="A" type="number" min="0" v-model="romaneio.bom_para_envase" /><br />

    <label for="itemB">(B) RETORNO VAZIO:</label>
    <input id="itemB" name="B" type="number" min="0" v-model="romaneio.retorno_vazio" /><br />

    <label for="itemC">(C) ENTRADA CHEIO:</label>
    <input id="itemC" name="C" type="number" min="0" v-model="romaneio.entrada_cheio" /><br />

    <label for="itemH">(H) TROCA (PERDA):</label>
    <input id="itemH" name="H" type="number" min="0" v-model="romaneio.troca_perda"/><br />

    <label for="itemI">(I) CHEIO (À FATURAR):</label>
    <input id="itemI" name="I" type="number" min="0" v-model="romaneio.cheio_a_faturar" /><br />

    <label for="itemJ">(J) TOTAL GERAL:</label>
    <input id="itemJ" name="J" type="number" min="0" v-model="getTotalGeral" disabled /><br />

    <button type="button" onclick="gravarRomaneio()">gravar</button>
    <button type="button" onclick="excluirRomaneio()">excluir</button>
        
</template>