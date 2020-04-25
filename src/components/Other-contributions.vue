<template>
<v-data-table
:headers="headers"
:items="items"
class="elevation-1">
<template #body.append="{headers}">
<tr :colspan="headers.length">
<td>OthersSub-Total</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><v-chip color="blue">{{Sum}}</v-chip></td>
<td></td>
</tr>
</template>
<template #top>
<div class="green"><p class="display-1 white--text">Other-Contributors<span><v-btn id="add" class="white--text" @click="add"><v-icon class="black--text">add</v-icon></v-btn></span></p></div>
</template>
<template #item.Amount="{item}">
<v-edit-dialog @save="save(item.Amount)" :return-value.sync="item.Amount"
        >{{ item.Amount }}
  <template #input>
     <v-text-field v-model="Amount" label="Edit"  type="number"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.Organization="{item}">
<v-edit-dialog :return-value.sync="item.Organization"
        >{{ item.Organization }}
  <template #input>
     <v-text-field  v-model="Organization" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.Description="{item}">
<v-edit-dialog :return-value.sync="item.Description"
        >{{ item.Description }}
  <template #input>
     <v-text-field v-model="Description" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.del="{item}">
<v-icon @click="deleteitem(item)">delete</v-icon>
</template>
</v-data-table>
</template>
<script>
export default{
props: {
    sos: {
      type: String
    }
  },
  data(){
  return{
  del:'',
  Sum:null,
  Amount:'',
  Description:'',
  Organization:'',
  items:[],
  headers:[ {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
             {text:'',value:'',sortable:false},
            {text:'',value:'',sortable:false},
             {text:'Description',value:'Description'},
            {text:'',value:'',sortable:false},
             {text:'',value:'Amount',sortable:false},
             {text:'',value:'del',sortable:false}
          ]

  }
  },
  methods:{
  add(){
  this.items.push({Organization:'',Description:'',Amount:''})
  },
  deleteitem(item){
   const index = this.items.indexOf(item)
   console.log(index)
   this.items.splice(index, 1)
   this.Sum=this.Sum-item.Amount
   this.$emit('Subtotal',{total:this.Sum})
  },
  save(amount){
  if(this.Amount==''){
   console.log(amount)
   if(amount==''){
   this.Sum=this.Sum+0
   this.$emit('Subtotal',{total:this.Sum})
    this.Amount=''
      this.Organization=''
      this.Description=''
      }
    else{
    this.Sum=this.Sum-amount
      this.Sum=this.Sum+0
      this.$emit('Subtotal',{total:this.Sum})
       this.Amount=''
      this.Organization=''
      this.Description=''
    }
  }
  else{
       this.Sum=this.Sum-amount
      this.Sum=this.Sum+parseInt(this.Amount)
      this.$emit('Subtotal',{total:this.Sum})
      this.Amount=''
      this.Organization=''
      this.Description=''
  }
  }
  },
  computed:{
OthersPercent:function(){
  let Total=parseInt(this.sos)+this.Sum
  return Math.round((this.Sum/Total)*100)
  }
}
}
</script>

<style scopped>
.green{
  height:50px;
}
#add{
position:absolute;
left:83%;
margin-top:5px;
}
.elevation-1{
  border:1px solid black;
}
.btn{
position:absolute;
left:60%;
}
#footer{
  border-top:1px solid black;
}
#Oi{
  border-bottom: 2px solid red;
}
.v-small-dialog__activator{
  width:100px;
  border-bottom:1px solid blue;
}
@media only screen and (min-width: 1024px) {
#add{
position:absolute;
left:85%;
margin-top:5px;
}
  
}
@media only screen and (min-width: 1024px) {

.v-small-dialog__activator{
  width:100px;
  border-bottom:1px solid blue;
}
  
}
</style>