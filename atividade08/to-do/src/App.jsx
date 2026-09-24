import { useState } from 'react'

function TaskItem({ task, onRemove, onToggle }) {
  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <button
        className="complete-button"
        type="button"
        onClick={() => onToggle(task.id)}
        aria-pressed={task.completed}
        aria-label={task.completed ? `Reabrir tarefa: ${task.text}` : `Marcar como feita: ${task.text}`}
      >
        <span className="task-marker" aria-hidden="true" />
      </button>
      <span className="task-text">{task.text}</span>
      <button
        className="remove-button"
        type="button"
        onClick={() => onRemove(task.id)}
        aria-label={`Remover tarefa: ${task.text}`}
      >
        Remover
      </button>
    </li>
  )
}

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const text = inputValue.trim()

    if (!text) return

    const newTask = { id: Date.now(), text, completed: false }
    setTasks((currentTasks) => [...currentTasks, newTask])
    setInputValue('')
  }

  function handleRemove(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function handleToggle(taskId) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )))
  }

  return (
    <main className="page-shell">
      <section className="todo-layout" aria-labelledby="page-title">
        <header className="intro">
          <p className="eyebrow">Organização pessoal <span>•</span> 2024</p>
          <h1 id="page-title">Dê ritmo ao<br /><em>seu dia.</em></h1>
          <p className="intro-copy">
            Uma tarefa por vez. Registre o que importa e mantenha seu foco no próximo passo.
          </p>
          <div className="rule" aria-hidden="true" />
          <p className="tip"><strong>Nota</strong> — tarefas pequenas também movem grandes projetos.</p>
        </header>

        <section className="todo-panel" aria-labelledby="list-title">
          <div className="panel-heading">
            <div>
              <p className="section-label">Sua lista</p>
              <h2 id="list-title">Próximos passos</h2>
            </div>
            <span className="task-count" aria-label={`${tasks.length} tarefas`}>{String(tasks.length).padStart(2, '0')}</span>
          </div>

          <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="new-task">Adicionar uma tarefa</label>
            <div className="input-row">
              <input
                id="new-task"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="O que precisa ser feito?"
                autoComplete="off"
              />
              <button type="submit" className="add-button">Adicionar <span aria-hidden="true">↗</span></button>
            </div>
          </form>

          <div className="list-area" aria-live="polite">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <span className="empty-mark" aria-hidden="true" />
                <p>Nenhuma tarefa por aqui.</p>
                <span>Comece adicionando um novo passo acima.</span>
              </div>
            ) : (
              <ul className="task-list">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onRemove={handleRemove} onToggle={handleToggle} />
                ))}
              </ul>
            )}
          </div>

          <footer className="panel-footer">
            <span>{tasks.length === 1 ? '1 tarefa' : `${tasks.length} tarefas`}</span>
            <span className="status-dot" aria-hidden="true" />
            <span>Atualizado agora</span>
          </footer>
        </section>
      </section>
      <footer className="page-footer">Feito para manter o essencial em movimento.</footer>
    </main>
  )
}

export default App
