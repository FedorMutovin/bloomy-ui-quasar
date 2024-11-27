export default {
  errors: {
    unexpected: 'Something went wrong'
  },
  success: 'Success',
  forms: {
    engagements: {
      update: {
        title: 'Adjust Engagement Level',
        hint: 'Update your engagement level and provide a reason to track changes over time'
      }
    },
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
      },
      unite: {
        button: 'Unite'
      }
    },
    thoughts: {
      create: {
        title: 'Create a New Thing'
      }
    },
    create: {
      root: {
        hint: 'Roots are how everything connects. They show where your journey started and how each step helps you grow.',
        label: 'Rooted In',
        no_option: 'No roots yet! Start creating something to inspire your next step.'
      },
      root_type: {
        info: 'Pick a category that fits your root best.',
        label: 'What’s This Root About?'
      },
      root_details_header: "Let's Define Your Root",
      attributes: {
        start_immediately: 'Start Immediately',
        schedule: 'Schedule Event',
        deadline: 'Set Deadline',
        engagement: 'Track Engagement'
      },
      hints: {
        start_immediately_hint: 'Check this box to start the event right away and set its status to ‘In Progress’.',
        schedule_hint: 'Check this box to set a scheduled start time for the event.',
        deadline_hint: 'Check this box to set a deadline time for the event.',
        engagement_hint: 'Want to know how engaged you are with this event? Enable tracking to find out!'
      }
    },
    unite: {
      title: 'Combine Two Roots into One Unified Entry',
      target: {
        label: 'Root to keep',
        hint: 'Choose the main root that will remain after uniting.'
      },
      source: {
        label: 'Root to unite',
        hint: 'This root will be united'
      },
      action: 'Unite'
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
    },
    thoughts: {
      title: 'Thoughts'
    }
  },
  attributes: {
    description: 'Description',
    status: 'Status',
    name: 'Name',
    started_at: 'Started',
    priority: 'Want To Grow',
    engagement: 'Engagement',
    initiated_at: 'Initiated At',
    schedule_at: 'Schedule At',
    deadline_at: 'Deadline Date',
    reason: 'Reason',
    engagements: {
      value: 'Engagement Value'
    },
    hints: {
      name: 'Give your event a name that stands out!',
      description: 'Add some details to make this event more meaningful.',
      priority: 'Priority',
      initiated_at: 'Initiated At',
      reason: 'Add reason'
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
    positive: 'Event has been created successfully.',
    unite: {
      positive: 'The roots has been united successfully.'
    }
  }
}
