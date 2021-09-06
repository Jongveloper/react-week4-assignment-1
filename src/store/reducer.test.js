import reducer from './reducer';

import { updateTaskTitle, addTask, deleteTask } from './actions';

describe('reducer', () => {
  context('with existed action', () => {
    describe('updateTaskTitle', () => {
      it('changes task title', () => {
        const state = reducer({
          taskTitle: '',
        }, updateTaskTitle('New Title'));

        expect(state.taskTitle).toBe('New Title');
      });
    });

    describe('addTask', () => {
      function reduceAddTask(taskTitle) {
        return reducer({
          newId: 100,
          taskTitle,
          tasks: [],
        }, addTask());
      }

      context('with task title', () => {
        it('appends a new task into tasks', () => {
          const state = reduceAddTask('New Task');

          expect(state.tasks).toHaveLength(1);
          expect(state.tasks[0].id).not.toBeUndefined();
          expect(state.tasks[0].title).toBe('New Task');
        });

        it('clears task title', () => {
          const state = reduceAddTask('New Task');

          expect(state.taskTitle).toBe('');
        });
      });

      context('without task title', () => {
        it("doesn't work", () => {
          const state = reduceAddTask('');

          expect(state.tasks).toHaveLength(0);
        });
      });
    });

    describe('deleteTask', () => {
      context('with existed task ID', () => {
        it('removes the task from tasks', () => {
          const state = reducer({
            tasks: [{ id: 1, title: 'Task' }],
          }, deleteTask(1));

          expect(state.tasks).toHaveLength(0);
        });
      });

      context('without existed task ID', () => {
        it("doesn't work", () => {
          const state = reducer({
            tasks: [{ id: 1, title: 'Task' }],
          }, deleteTask(100));

          expect(state.tasks).toHaveLength(1);
        });
      });
    });
  });

  context('with none existed action', () => {
    it('returns previous state', () => {
      const previousState = {
        tasks: [{ id: 1, title: 'Task' }],
      };

      const nextState = reducer(previousState, { type: undefined });

      expect(previousState).toEqual(nextState);
    });
  });

  context('with none existed state', () => {
    it('returns initialState', () => {
      const initialState = {
        newId: 100,
        taskTitle: '',
        tasks: [],
      };

      const nextState = reducer(undefined, { type: undefined });

      expect(nextState).toEqual(initialState);
    });
  });
});
