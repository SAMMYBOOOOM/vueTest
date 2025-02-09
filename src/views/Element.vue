<template>
  <div>

    <el-menu router style="border: none" :default-active="$route.path">
      <el-menu-item index="/">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span>Home page</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/element">Element</el-menu-item>
      <el-menu-item>Home</el-menu-item>
      <el-menu-item>Home</el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>Management</span>
        </template>
        <el-menu-item>User information</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>

    <!--    <el-row gutter="10">-->
    <!--      <el-col :span="6">-->
    <!--        <div style="width: 100%; height: 300px; background-color: dodgerblue;"></div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="6">-->
    <!--        <div style="width: 100%; height: 300px; background-color: pink;"></div>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row>
      <el-col :span="6">
        <div style="padding: 10px; border: 1px solid #ccc; text-align: center">
          <img style="width: 80%" src="@/assets/logo.png" alt="">
          <div style="text-align: center">This is something</div>
          <div style="color: red">Price: 200</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="padding: 10px; border: 1px solid #ccc; text-align: center">
          <img style="width: 80%" src="@/assets/logo.png" alt="">
          <div style="text-align: center">This is something</div>
          <div style="color: red">Price: 200</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="padding: 10px; border: 1px solid #ccc; text-align: center">
          <img style="width: 80%" src="@/assets/logo.png" alt="">
          <div style="text-align: center">This is something</div>
          <div style="color: red">Price: 200</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="padding: 10px; border: 1px solid #ccc; text-align: center">
          <img style="width: 80%" src="@/assets/logo.png" alt="">
          <div style="text-align: center">This is something</div>
          <div style="color: red">Price: 200</div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <button>Normal button</button>
        <el-button>Element button</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="danger" plain round>Danger</el-button>
        <el-button type="warning" circle>Warning</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="success">Success</el-button>
        <el-button circle icon="el-icon-search"></el-button>
        <el-button circle icon="el-icon-edit" type="primary"></el-button>
      </el-col>
    </el-row>

    <el-row style="top: 20px">
      <el-col>
        <el-input style="width: 200px" v-model="value" placeholder="Please input"></el-input>
        <el-input type="textarea" style="width: 200px" v-model="value" placeholder="Please input"></el-input>
        <el-input show-password style="width: 200px" v-model="value" placeholder="Please input"></el-input>
        <el-input clearable style="width: 200px" v-model="value" placeholder="Please input"
                  suffix-icon="el-icon-search"></el-input>
      </el-col>
    </el-row>

    <el-row style="margin: 20px 0">
      <el-autocomplete style="width: 300px" placeholder="Search" :fetch-suggestions="querySearch"
                       :trigger-on-focus="false" v-model="value1"></el-autocomplete>
    </el-row>

    <el-row style="top: 20px;">
      <el-select v-model="select" @change="changeSelect" placeholder="Please select">
        <el-option value="1"></el-option>
        <el-option value="2"></el-option>
        <el-option value="3"></el-option>

      </el-select>
      <el-select v-model="select" @change="changeSelect" placeholder="Please select">
        <el-option v-for="item in fruits" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <el-select v-model="select1" @change="changeSelect1" placeholder="Please select" multiple filterable>
        <el-option v-for="item in users" :key="item.card" :label="item.name" :value="item.card"></el-option>
      </el-select>
    </el-row>

    <el-row style="margin: 20px 0">
      <el-radio-group v-model="radio" @change="changeRadio">
        <el-radio label="1">Radio 1</el-radio>
        <el-radio label="2">Radio 2</el-radio>
      </el-radio-group>

      <el-checkbox-group v-model="checkList" @change="changeSelectRadio">
        <el-checkbox label="multi 1"></el-checkbox>
        <el-checkbox label="multi 2"></el-checkbox>
      </el-checkbox-group>

      <el-date-picker v-model="date" type="date" placeholder="Pick a date" value-format="MM-dd-yyyy"
                      @change="changeDate" style="width: 300px"></el-date-picker>
      <el-date-picker v-model="datetime" type="datetime" placeholder="Pick a date" value-format="MM-dd-yyyy HH:mm:ss"
                      @change="changeDateTime" style="width: 300px"></el-date-picker>

      <el-date-picker v-model="daterange" type="daterange" range-separator="To" start-placeholder="Start date"
                      end-placeholder="End date" style="width: 300px"></el-date-picker>

    </el-row>

    <el-row style="top: 20px">
      <el-table :data="tableData" border :header-cell-style="{background: 'aliceblue', fontSize: '20px'}">
        <el-table-column label="identity" prop="id" align="center"></el-table-column>
        <el-table-column label="name" prop="name" align="center"></el-table-column>
        <el-table-column label="address" prop="address" align="center"></el-table-column>
        <el-table-column label="age" prop="age" align="center"></el-table-column>
        <el-table-column label="edit">
          <template v-slot="scope">
            <el-button type="primary" @click="edit(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Element',
  data() {
    return {
      tableData: [{name: 'Sam', address: '123', id: 1, age: 20}, {
        name: 'Tom',
        address: '456',
        id: 2,
        age: 21
      }, {name: 'Lily', address: '789', id: 3, age: 22}],
      value: '',
      value1: '',
      coffees: [{value: '1black'}, {value: '1white'}, {value: '2latte'}, {value: '3cappuccino'}],
      select: '',
      select1: '',
      fruits: [{name: 'apple', id: 1}, {name: 'banana', id: 2}, {name: 'orange', id: 3}],
      users: [{name: 'Sam', card: '123'}, {name: 'Tom', card: '456'}, {name: 'Lily', card: '789'}],
      radio: '',
      checkList: [],
      date: '',
      datetime: '',
      daterange: ''
    }
  },
  methods: {
    querySearch(query, cb) {  // callback
      // console.log(query)
      let result = query ? this.coffees.filter(v => v.value.includes(query)) : this.coffees
      cb(result)
    },
    changeSelect() {
      console.log(this.select)
    },
    changeSelect1() {
      console.log(this.select1)
    },
    changeRadio() {
      console.log(this.radio)
    },
    changeSelectRadio() {
      console.log(this.checkList)
    },
    changeDate() {
      console.log(this.date)
    },
    changeDateTime() {
      console.log(this.datetime)
    },
    edit(row) {
      // alert(row.name)
      this.$message.success(row.name)
      // this.$notify.warning(row.name)
      this.$confirm("Are you sure to delete this item?", "Warning", {
        type: 'warning'
      }).then(res => {
        this.$message.success("you click ok")
      }).catch(() => {
        this.$message.info("you click cancel")
      })
    }

  }
}
</script>