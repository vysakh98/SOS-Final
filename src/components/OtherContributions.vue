<template>
<div>
<v-data-table
:headers="headers"
:items="items"
class="elevation-1">
<template #body.append="{headers}">
<tr :colspan="headers.length">
<td>Others-Sub-Total</td>
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
<span>add row</span>
</v-tooltip>
</span>
</p></div>
</template>
<template #item.Amount="{item}">
<tr>
  <td v-if="Amountedit && editindex==items.indexOf(item)">
     <v-text-field @keydown="save($event,item.Amount,item)" v-model="Amount" type="number" placeholder="Amount"></v-text-field>
  </td>
  <td  v-else>{{item.Amount}}</td>
</tr>
</template>
<template #item.Organization="{item}">
<tr>
    <td v-if="Organizationedit && editindex==items.indexOf(item)">
     <v-text-field @keydown="Organizationsave($event,item)" v-model="Organization" placeholder="Organization"></v-text-field>
    </td>
    <td class="td" v-else>{{item.Organization}}</td>
</tr>
</template>
<template #item.Description="{item}">
<tr>
   <td v-if="Descriptionedit && editindex==items.indexOf(item)">
     <v-text-field @keydown="Descriptionsave($event,item)"  v-model="Description" placeholder="Description"></v-text-field>
   </td>
   <td  v-else>{{item.Description}}</td>
</tr>
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
  Descriptionsave(e,item){
  if(e.keyCode == 13 ){
  console.log(e)
  let index=this.items.indexOf(item)
  this.items[index].Description=this.Description
  this.Descriptionedit=false
  }
  else if(e.keyCode == 9){
  console.log(e)
  let index=this.items.indexOf(item)
  this.items[index].Description=this.Description
  this.Descriptionedit=false
  }
  },
  Organizationsave(e,item){
   if(e.keyCode == 13){
  let index=this.items.indexOf(item)
  this.items[index].Organization=this.Organization
  this.Organizationedit=false
  }
  else if(e.keyCode == 9){
   let index=this.items.indexOf(item)
  this.items[index].Organization=this.Organization
  this.Organizationedit=false

  }
  },
  edit(item){
  let editindex = this.items.indexOf(item)
  this.editindex=editindex
  this.Organizationedit=true
  this.Amountedit=true
  this.Descriptionedit=true
  },
  add(){
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
  save(e,amount,item){
  console.log(this.items)
  console.log(e)
  if(e.keyCode === 13 || e.keyCode== 9){
  let index=this.items.indexOf(item)
  this.items[index].Amount=this.Amount
  this.Amountedit=false
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
.td{
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