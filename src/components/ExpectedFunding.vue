<template>
<v-container id="top-container">
<v-toolbar class="grey" flat>
<v-toolbar-title  class="white--text display-1">Expected Source of Income</v-toolbar-title>
</v-toolbar>
<v-data-table
:items="items"
:headers="header"
class="elevation-1">
<template #item.Percent>
<td><v-chip color="blue" dark>{{Sospercent}}%</v-chip></td>
</template>
<template #item.Amount="{item}">
<v-edit-dialog :return-value.sync="item.Amount"
        >{{ item.Amount }}
  <template #input>
     <v-text-field v-model="Amount" label="Edit" type="number"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #body.append="{headers}">
<tr>
 <td :colspan="headers.length" id="table-td">
    <subtable :sos="Amount" v-on:Subtotal="Total($event)"></subtable>
 </td>
</tr>
<tr :colspan="headers.length">
<td id="ext">Expected-total</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><v-chip color="blue" dark>{{ExpectedTotal}}</v-chip></td>
<td></td>
</tr>
<tr :colspan="headers.length">
<td>Others-percent</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><v-chip color="blue" dark>{{OthersPercent}}%</v-chip></td>
</tr>
</template>
</v-data-table>
</v-container>
</template>


<script>
import subtable from '@/components/OtherContributions.vue'
export default{
    data()
    {
    return{
    total:null,
    Amount:null,
    Organization:'',
    Description:'',
     items:[{Organization:'SOS contribution sought in application',Amount:'',Percent:''}],
       header:[ {text: '',
            align: 'start',
            sortable: false,
            value: 'Organization',
            class:'h'},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
            {text:'',value:'null',sortable: false},
           {text:'Amount(€)',value:'Amount',class:'h'},
           {text:'Percentage',value:'Percent'}]
       }
},
methods:{
  Total:function(e){
  this.total=e.total
  }
 },
components:{
  'subtable':subtable
},
computed:{
  ExpectedTotal(){
  return parseInt(this.Amount)+this.total
  },
   Sospercent(){
  let Total=this.total+parseInt(this.Amount)
  return Math.round((this.Amount/Total)*100)
  },
  OthersPercent:function(){
  let Total=parseInt(this.Amount)+this.total
  return Math.round((this.total/Total)*100)
  }
}
}
</script>
 

<style scoped>
#add{
  position:absolute;
  left:90%;
}
#table-td{
  padding-left:0px;
  padding-right:0px;
  border:1px solid black;
}
.elevation-1{
  border:1px solid black;
}
.h{
  font-Size:1.5em;
}
thead{
  font-size:1.5em;
}
.v-small-dialog__activator{
  width:100px;
  border-bottom:1px solid blue;
}
#top-container{
  background-color:#dbdbdb;
  margin-top:10px;
}
</style>