export default {
  errors: {
    unexpected: 'Something went wrong'
  },
  success: 'Success',
  forms: {
    wishes: {
      activate: {
        header: 'Take the First Step and Create a Related Action!',
        buttons: {
          action: 'Activate'
        }
      },
      create: {
        title: 'Create a New Wish'
      }
    },
    goals: {
      create: {
        title: 'Create a New Goal',
        action_steps: 'Related Tasks',
        action_steps_tip: 'To make this goal achievable, be sure to add at least one task that will help you take the first step toward reaching it!',
        add_task: 'Add a new task'
      }
    },
    tasks: {
      create: {
        title: 'Create a New Task'
      }
    },
    actions: {
      create: {
        title: 'Create a New Action'
      }
    },
    create: {
      trigger: {
        info: 'A trigger is an event or action that leads to another event, helping you link them together as part of your progress.',
        label: 'Triggered By',
        no_option: 'No events yet! Start creating your first one.'
      },
      event_type: {
        info: 'Choose the category that best describes your event.',
        label: 'Event Type'
      },
      event_details_header: 'Event Details',
      attributes: {
        start_immediately: 'Start Immediately',
        schedule: 'Schedule Event'
      },
      hints: {
        start_immediately_hint: 'Check this box to start the event right away and set its status to ‘In Progress’.',
        schedule_hint: 'Check this box to set a scheduled start time for the event.'
      }
    }
  },
  cards: {
    wishes: {
      title: 'Wishes',
      description: 'A space to capture experiences, dreams, and aspirations you’d like to enjoy or fulfill someday.'
    },
    goals: {
      title: 'Goals',
      description: 'A space to define, track, and achieve meaningful milestones and ambitions you want to bring to life.'
    },
    tasks: {
      title: 'Tasks',
      description: 'A space for managing essential steps and actions that bring you closer to your larger goals, keeping you focused on progress.'
    },
    actions: {
      title: 'Actions',
      description: 'A record of completed activities, capturing what you’ve done and the choices you’ve made along the way.'
    }
  },
  attributes: {
    description: 'Description',
    status: 'Status',
    name: 'Name',
    started_at: 'Started',
    priority: 'Priority',
    initiated_at: 'Initiated At',
    schedule_at: 'Schedule At',
    hints: {
      name: 'Give your event a name that stands out!',
      description: 'Add some details to make this event more meaningful.',
      priority: 'Priority',
      initiated_at: 'Initiated At'
    }
  },
  buttons: {
    cancel: 'Cancel',
    save: 'Save',
    make_it_goal: 'Make it a Goal',
    remove: 'Remove'
  },
  statuses: {
    in_progress: 'In Progress',
    pending: 'Pending',
    scheduled: 'Scheduled',
    postponed: 'Postponed'
  },
  messages: {
    positive: 'Event has been created successfully.'
  }
}
