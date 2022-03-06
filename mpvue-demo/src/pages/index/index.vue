<template>
	<div class="mpvue-demo">
		<p class="title">{{title}}</p>
		<!-- v-model 双向绑定 -->
		<p>{{myTodo}}</p>
		<input type="text" v-model="myTodo" placeholder="点我" />
		<!-- 事件  @click -->
		<button @click="addTodo">加一条</button>
		<button @click="clearTodo">清空</button>
		<ul class="todos">
			<!-- v-for v-key 循环指令 in 指定( key + index )-->
			<!-- 一个 {} 表示js 运行区域 -->
			<!-- todo.done为真 就会输出 done类名 -->
			<!-- : 动态绑定属性，标签或组件的属性是跟data相关 -->
			<li v-key="i" v-for="(todo, i) in todos" :class="{'done': todo.done}" @click="toggle(i)">{{todo.text}} ？ {{todo.done}}</li>
			<li>未完成 {{todoNum}}/{{todos.length}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: "ToDoList",
				todos: [
					{'text': '吃饭', done: true},
					{'text': '睡觉', done: false},
					{'text': '打豆豆', done: false},
				],
				myTodo: ''
			};
		},

		components: {},

		// 计算属性
		computed: {
			todoNum() {
				return this.todos.filter(todo => !todo.done).length
			}
		},

		methods: {
			addTodo() {
				if (!this.myTodo) {
					return
				}
				this.todos.push({'text': this.myTodo, done: false})
				this.myTodo = ''
				console.log(this.todos)
			},
			toggle(i) {
				// 状态的切换
				// 数据双向绑定
				// 只要改变了数据界面立刻改变
				this.todos[i].done = !this.todos[i].done
			},
			clearTodo() {
				this.todos = []
			}
		},
		// 生命周期函数
		created() { }
	};
</script>

<style scoped>
	/* 单页面组件 style+ script+ template */
	.title {
		color: #ed12a3;
		text-align: center;
	}

	ul.todos {
		margin: 20px;
	}

	input {
		border: 2px solid #ed12a3;
		margin-bottom: 20px;
	}

	.done {
		text-decoration: line-through;
	}
</style>