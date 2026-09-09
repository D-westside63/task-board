import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board.tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // 保存に失敗しても操作は継続できるようにする
    }
  }, [tasks])

  function addTask(e) {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, done: false },
    ])
    setText('')
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const remaining = tasks.filter((task) => !task.done).length

  return (
    <main className="app">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="タスクを入力..."
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません。</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.done ? 'task task--done' : 'task'}
            >
              <label className="task__main">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task__title">{task.title}</span>
              </label>
              <button
                type="button"
                className="task__delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`「${task.title}」を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && (
        <p className="status">
          未完了 {remaining} 件 / 全 {tasks.length} 件
        </p>
      )}
    </main>
  )
}
