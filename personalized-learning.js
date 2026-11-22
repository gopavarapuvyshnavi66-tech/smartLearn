
document.addEventListener('DOMContentLoaded', () => {
  const learningPath = document.getElementById('learningPath')
  const emptyState = document.getElementById('emptyState')

  const assessment = readStorage('latestAssessment')
  const currentUser = readStorage('currentUser')

  // Display the student's name if it is available.
  const studentName =
    typeof currentUser === 'string'
      ? currentUser
      : currentUser?.name ||
        currentUser?.username ||
        currentUser?.fullName ||
        'Student'

  document.getElementById('profileName').textContent = studentName
  document.getElementById('sidebarName').textContent = studentName

  const initial = studentName.trim().charAt(0).toUpperCase() || 'S'

  document.getElementById('profileAvatar').textContent = initial
  document.getElementById('sidebarAvatar').textContent = initial

  // Show the latest assessment score.
  if (!assessment || !assessment.topics) {
    showEmptyState()
    return
  }

  const overallScore = calculateOverallScore(assessment)

  document.getElementById('overallScore').textContent =
    overallScore === null ? '--' : `${overallScore}%`

  // Convert saved topic results into a consistent format.
  const topics = normalizeTopics(assessment.topics)

  if (topics.length === 0) {
    showEmptyState()
    return
  }

  // Higher priority goes to weaker topics.
  // Stable sorting keeps the original order for equal scores.
  topics.sort((a, b) => a.percentage - b.percentage)

  const strongTopics = topics.filter(topic => topic.percentage >= 75)

  const weakTopics = topics.filter(topic => topic.percentage < 50)

  document.getElementById('strongCount').textContent =
    strongTopics.length

  document.getElementById('weakCount').textContent =
    weakTopics.length

  document.getElementById('recommendationBadge').textContent =
    `${topics.length} topics analyzed`

  renderTopics(topics)

  // Read data saved in localStorage safely.
  function readStorage(key) {
    try {
      const value = localStorage.getItem(key)

      if (!value) return null

      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (error) {
      console.error(`Unable to read ${key}:`, error)
      return null
    }
  }

  function calculateOverallScore(data) {
    const directScore = Number(data.score)

    if (
      data.score !== undefined &&
      data.score !== null &&
      data.score !== '' &&
      Number.isFinite(directScore)
    ) {
      // Handles scores expressed as percentages or raw marks.
      if (directScore >= 0 && directScore <= 100) {
        return Math.round(directScore)
      }

      const total = Number(data.total)

      if (total > 0 && directScore <= total) {
        return Math.round((directScore / total) * 100)
      }
    }

    const correct = Number(data.correct)
    const total = Number(data.total)

    if (
      data.correct !== undefined &&
      data.total !== undefined &&
      total > 0
    ) {
      return Math.round((correct / total) * 100)
    }

    return null
  }

  function normalizeTopics(topicData) {
    let entries = []

    if (Array.isArray(topicData)) {
      entries = topicData.map((item, index) => [
        item?.topic ||
          item?.topicName ||
          item?.name ||
          `Topic ${index + 1}`,
        item,
      ])
    } else if (
      topicData &&
      typeof topicData === 'object'
    ) {
      entries = Object.entries(topicData)
    }

    return entries.map(([name, rawValue]) => {
      const value =
        rawValue && typeof rawValue === 'object'
          ? rawValue
          : { percentage: Number(rawValue) }

      const correct = Number(value.correct)
      const total = Number(value.total)

      let percentage = Number(
        value.percentage ??
          value.accuracy ??
          value.score ??
          value.progress
      )

      // If a topic has correct and total counts,
      // calculate its percentage from those counts.
      if (
        value.correct !== undefined &&
        value.total !== undefined &&
        Number.isFinite(correct) &&
        Number.isFinite(total) &&
        total > 0
      ) {
        percentage = (correct / total) * 100
      }

      if (!Number.isFinite(percentage)) {
        percentage = 0
      }

      // Accept both percentage values and fractions.
      if (percentage > 0 && percentage <= 1) {
        percentage *= 100
      }

      percentage = Math.max(
        0,
        Math.min(100, Math.round(percentage))
      )

      return {
        name: String(name),
        percentage,
        correct: Number.isFinite(correct) ? correct : null,
        total: Number.isFinite(total) ? total : null,
      }
    })
  }

  function getTopicStatus(topic) {
    if (topic.percentage >= 75) {
      return {
        label: 'Strong topic',
        className: 'strong',
        description:
          'You understand this topic well. Try more challenging questions to strengthen your skills.',
        buttonText: 'Practice More',
      }
    }

    if (topic.percentage < 50) {
      return {
        label: 'Needs attention',
        className: 'revise',
        description:
          'Spend more time on this topic. Review the lesson and work through examples before taking a quiz.',
        buttonText: 'Revise Topic',
      }
    }

    return {
      label: 'Keep improving',
      className: 'review',
      description:
        'You have a good starting point. Review the key concepts and practise a few more questions.',
      buttonText: 'Continue Learning',
    }
  }

  function renderTopics(topicList) {
    learningPath.innerHTML = ''
    emptyState.hidden = true
    learningPath.hidden = false

    topicList.forEach((topic, index) => {
      const status = getTopicStatus(topic)

      const card = document.createElement('article')
      card.className = 'topic-card'

      const icon = topic.percentage < 50
        ? '📘'
        : topic.percentage >= 75
          ? '🎯'
          : '💡'

      const questionInfo =
        topic.correct !== null &&
        topic.total !== null &&
        topic.total > 0
          ? `${topic.correct} of ${topic.total} questions correct`
          : 'Based on your latest assessment'

      card.innerHTML = `
        <div class="topic-top">
          <div class="topic-icon" aria-hidden="true">${icon}</div>
          <span class="topic-status ${status.className}">
            ${status.label}
          </span>
        </div>

        <h3></h3>

        <p class="topic-description"></p>

        <div class="progress-section">
          <div class="progress-heading">
            <span>${questionInfo}</span>
            <strong>${topic.percentage}%</strong>
          </div>

          <div
            class="progress-track"
            role="progressbar"
            aria-label="Assessment performance"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${topic.percentage}"
          >
            <div
              class="progress-fill"
              style="width: ${topic.percentage}%"
            ></div>
          </div>
        </div>

        <div class="topic-actions">
          <button class="primary-button learn-button" type="button">
            ${status.buttonText} →
          </button>

          <button class="secondary-button practice-button" type="button">
            Practice Now
          </button>
        </div>
      `

      // Use textContent for topic names and descriptions
      // so stored text is not interpreted as HTML.
      card.querySelector('h3').textContent = topic.name
      card.querySelector('.topic-description').textContent =
        status.description

      card.querySelector('.learn-button').addEventListener('click', () => {
        navigateTo('Learn.html', topic.name)
      })

      card.querySelector('.practice-button').addEventListener('click', () => {
        navigateTo('practice.html', topic.name)
      })

      learningPath.appendChild(card)
    })
  }

  function navigateTo(page, topicName) {
    const params = new URLSearchParams({
      topic: topicName,
    })

    window.location.href = `${page}?${params.toString()}`
  }

  function showEmptyState() {
    document.getElementById('overallScore').textContent = '--'
    document.getElementById('strongCount').textContent = '0'
    document.getElementById('weakCount').textContent = '0'

    learningPath.hidden = true
    emptyState.hidden = false
  }
})
function logoutStudent() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    // Clear session
    sessionStorage.removeItem("smartLearnLoggedIn");

    // Clear user data if required
    localStorage.removeItem("studentUser");

    

    // Redirect to login page
    window.location.replace("./index.html");
}
