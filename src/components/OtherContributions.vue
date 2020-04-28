<template>
<div>
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
<td></td>
<td><v-chip color="blue">{{Sum}}</v-chip></td>
<td></td>
</tr>
</template>
<template #top>
<div class="top-div"><p class="display-1 white--text">Other-Contributors
<span>
<v-tooltip bottom>
<template #activator="{ on }">
<v-btn id="add" class="white--text" @click="add" v-on="on"><v-icon class="black--text">add</v-icon></v-btn>
</template>
<span>add Row</span>
</v-tooltip>
</span>
</p></div>
</template>
<template #item.Amount="{item}">
<v-edit-dialog :class="[AmountEditable && editindex==items.indexOf(item) ? editable : noteditable ] "  @save="save(item.Amount)" @cancel="cancel" @open="open" :return-value.sync="item.Amount"><p>{{ item.Amount }}</p>
  <template class="text-field" v-if="Amountedit && editindex==items.indexOf(item)" #input>
     <v-text-field   v-model="Amount" label="Edit"  type="number"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.Organization="{item}">
<v-edit-dialog :class="[OrganizationEditable  && editindex==items.indexOf(item) ? editable : noteditable ]" @save="Organizationsave" @cancel="cancel" @open="open" :return-value.sync="item.Organization"
        ><p>{{ item.Organization }}</p>
  <template v-if="Organizationedit && editindex==items.indexOf(item)" #input>
     <v-text-field v-model="Organization" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.Description="{item}">
<v-edit-dialog :class="[DescriptionEditable  && editindex==items.indexOf(item) ? editable : noteditable ]"  @save="Descriptionsave" @cancel="cancel" @open="open"  :return-value.sync="item.Description"
        ><p>{{ item.Description }}</p>
  <template class="text-field" v-if="Descriptionedit && editindex==items.indexOf(item)" #input>
     <v-text-field  v-model="Description" label="Edit"></v-text-field>
  </template>
</v-edit-dialog>
</template>
<template #item.del="{item}">
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon id="del" @click="deleteitem(item)"  v-on="on">delete</v-icon>
</template>
<span>delete</span>
</v-tooltip>
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon id="edit" @click="edit(item)" v-on="on">edit</v-icon>
</template>
<span>edit</span>
</v-tooltip>
</template>
</v-data-table>
<v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      <h1>{{ snackText }}</h1>
      <v-btn text @click="snack = false">Close</v-btn>
</v-snackbar>
</div>
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
  on:true,
  editable:'editable',
  noteiditable:'noteditable',
  DescriptionEditable:false,
  OrganizationEditable:false,
  AmountEditable:false,
  count:-1,
  editindex:null,
  Organizationedit:false,
  Amountedit:false,
  Descriptionedit:false,
  snack:false,
  snackText:'',
  snackColor:'',
  del:'',
  Sum:0,
  Amount:null,
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
            {text:'',value:'',sortable:false},
             {text:'',value:'Amount'},
             {text:'',value:'del'}
          ]
  }
  },
  methods:{
  Descriptionsave(){
  this.DescriptionEditable=false
  this.Descriptionedit=false
  },
  Organizationsave(){
  this.OrganizationEditable=false
  this.Organizationedit=false
  },
  edit(item){
  let editindex = this.items.indexOf(item)
  this.editindex=editindex
  this.Organizationedit=true
  this.Amountedit=true
  this.Descriptionedit=true
  this.DescriptionEditable=true
  this.OrganizationEditable=true
  this.AmountEditable=true
  },
  add(){
  this.DescriptionEditable=true,
  this.OrganizationEditable=true,
  this.AmountEditable=true,
  this.count=this.count+1
  this.editindex=this.count
  this.Organizationedit=true,
  this.Amountedit=true,
  this.Descriptionedit=true,
  this.items.push({Organization:'',Description:'',Amount:''})
  },
  deleteitem(item){
  this.count=this.count-1
   const index = this.items.indexOf(item)
   console.log(index)
   this.items.splice(index, 1)
   this.Sum=this.Sum-item.Amount
   this.$emit('Subtotal',{total:this.Sum})
  },
  save(amount){
  console.log(this.items)
  this.AmountEditable=false
  this.Amountedit=false
  this.snack = true
  this.snackColor = 'success'
  this.snackText = 'Data saved'
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
  },
  cancel(){
   this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
  },
   open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'press enter to save press esc to cancel'
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

<style>
.editable{
border-bottom:1px solid blue;
}
.noteditable{
  
}
#edit{
  margin-left:30px;
}
.text-field{
  border-bottom:1px solid blue;
}
#top-div{
  padding-left:0px;
  padding-right:0px;
}
.top-div{
  height:50px;
  background-color:grey;
}
#add{
position:absolute;
left:89%;
margin-top:5px;
}
.elevation-1{
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
  width:150px;
}
@media only screen and (min-width: 1024px) {
#add{
position:absolute;
left:85%;
margin-top:5px;
}
  
}
@media only screen and (min-width: 1299px) {
#add{
position:absolute;
left:89%;
margin-top:5px;
}
  
}
@media only screen and (min-width: 1440px) {
#add{
position:absolute;
left:85%;
margin-top:5px;
}
}
@media only screen and (min-width: 2560px) {
#add{
position:absolute;
left:81%;
margin-top:5px;
}
}
</style>