document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'smartLearnLessonProgress';
  const params = new URLSearchParams(window.location.search);
  const requestedTopic = (params.get('topic') || 'Data Structures & Algorithms').trim();

  const courses = {
    dsa: {
      title: 'Data Structures & Algorithms',
      description: 'Learn how data is organized and how algorithms solve problems efficiently.',
      aliases: ['dsa', 'data structures', 'data structure', 'algorithm', 'algorithms', 'array', 'arrays', 'string', 'strings', 'linked list', 'stack', 'queue', 'tree', 'trees', 'graph', 'graphs', 'sorting', 'searching', 'recursion', 'hashing'],
      lessons: [
        {
          title: 'Introduction to Data Structures', duration: '5 min read',
          intro: 'A data structure is a way of organizing and storing data so that it can be accessed and modified efficiently.',
          sections: [
            ['What is a data structure?', 'A data structure describes how values are arranged in memory and which operations can be performed on them. Choosing a suitable structure can make a program faster and easier to maintain.'],
            ['Common examples', 'Arrays store elements in indexed positions. Linked lists connect nodes. Stacks follow Last In, First Out (LIFO). Queues follow First In, First Out (FIFO). Trees represent hierarchical data, while graphs represent relationships.'],
            ['How to choose one', 'Think about the operations your program performs most often: searching, inserting, deleting, or accessing an element by position.']
          ],
          takeaway: 'The best data structure depends on the problem and the operations you need.'
        },
        {
          title: 'Arrays and Array Operations', duration: '7 min read',
          intro: 'An array stores a sequence of elements. In many languages, elements are accessed using an index that starts at zero.',
          sections: [
            ['Accessing an element', 'If an array contains [10, 20, 30], the element at index 0 is 10, the element at index 1 is 20, and the element at index 2 is 30.'],
            ['Common operations', 'Access by index is usually O(1). Searching an unsorted array takes O(n) in the worst case. Inserting or deleting in the middle may require shifting elements and can take O(n).'],
            ['Example', 'Use an array when you need ordered data and frequent access by index.']
          ],
          code: 'int[] numbers = {10, 20, 30};\nSystem.out.println(numbers[1]); // 20',
          takeaway: 'Array indexing is fast, but inserting or deleting in the middle can require shifting elements.'
        },
        {
          title: 'Searching and Sorting Basics', duration: '8 min read',
          intro: 'Searching finds a target value, while sorting arranges values in a particular order.',
          sections: [
            ['Linear search', 'Check elements one by one until the target is found or the array ends. Its worst-case time complexity is O(n).'],
            ['Binary search', 'Binary search repeatedly halves the search range. It requires sorted data and takes O(log n) time.'],
            ['Sorting', 'Bubble sort, selection sort and insertion sort are beginner-friendly algorithms. More advanced algorithms include merge sort and quicksort.']
          ],
          code: 'int[] values = {2, 4, 6, 8, 10};\n// Binary search can be used because the array is sorted.',
          takeaway: 'Binary search is efficient, but only use it when the data is sorted.'
        },
        {
          title: 'Time and Space Complexity', duration: '6 min read',
          intro: 'Complexity analysis helps estimate how an algorithm behaves as the input size grows.',
          sections: [
            ['Time complexity', 'Time complexity describes how the number of operations grows with input size. Common classes include O(1), O(log n), O(n), O(n log n), and O(n²).'],
            ['Space complexity', 'Space complexity describes the extra memory an algorithm needs as the input grows.'],
            ['A simple comparison', 'A single loop over n elements is commonly O(n). A nested loop where both loops run n times is commonly O(n²).']
          ],
          code: '// One loop: O(n)\nfor (int i = 0; i < n; i++) {\n    System.out.println(i);\n}',
          takeaway: 'Big-O describes growth, not the exact running time on a particular computer.'
        }
      ]
    },
    dbms: {
      title: 'Database Management Systems',
      description: 'Understand how databases store, organize, retrieve and protect information.',
      aliases: ['dbms', 'database', 'databases', 'sql', 'normalization', 'transaction', 'transactions'],
      lessons: [
        { title: 'Introduction to DBMS', duration: '5 min read', intro: 'A Database Management System (DBMS) is software that helps users create, store, retrieve and manage data.', sections: [['Why use a DBMS?', 'A DBMS provides an organized way to store information, query records, control access and reduce unnecessary duplication.'], ['Examples', 'Relational database systems organize information into tables. Examples include SQLite, MySQL, PostgreSQL and Oracle Database.'], ['Database vs DBMS', 'A database is the organized collection of data. A DBMS is the software used to manage that data.']], takeaway: 'A DBMS provides tools to define, query, update and control a database.' },
        { title: 'Tables, Keys and Relationships', duration: '7 min read', intro: 'Relational databases organize data into tables made of rows and columns.', sections: [['Rows and columns', 'A row represents one record. A column represents an attribute, such as student_id, name or email.'], ['Primary key', 'A primary key uniquely identifies each row in a table. It must be unique and cannot be NULL.'], ['Foreign key', 'A foreign key refers to a key in another table and helps represent relationships between tables.']], code: 'CREATE TABLE Student (\n  student_id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL\n);', takeaway: 'Primary keys identify records; foreign keys connect related tables.' },
        { title: 'SQL Fundamentals', duration: '8 min read', intro: 'SQL (Structured Query Language) is commonly used to define, retrieve and modify data in relational databases.', sections: [['Read data', 'SELECT retrieves data from one or more tables. WHERE filters rows based on a condition.'], ['Modify data', 'INSERT adds records, UPDATE changes existing records, and DELETE removes records.'], ['Sort and group', 'ORDER BY sorts query results. GROUP BY groups rows so aggregate functions can be applied.']], code: 'SELECT name\nFROM Student\nWHERE student_id = 1;', takeaway: 'Start with SELECT, INSERT, UPDATE and DELETE before moving to joins and advanced queries.' },
        { title: 'Normalization and Transactions', duration: '8 min read', intro: 'Normalization organizes relational tables to reduce redundancy. Transactions group database operations into a logical unit.', sections: [['Normalization', 'Normalization uses rules and table decomposition to reduce repeated data and update anomalies. First Normal Form (1NF), Second Normal Form (2NF) and Third Normal Form (3NF) are common stages.'], ['Transactions', 'A transaction is a sequence of database operations treated as one logical unit.'], ['ACID properties', 'Atomicity, Consistency, Isolation and Durability describe important transaction properties.']], takeaway: 'Normalization improves table design; ACID properties help transactions remain reliable.' }
      ]
    },
    os: {
      title: 'Operating Systems',
      description: 'Explore processes, memory, scheduling and the software that manages computer resources.',
      aliases: ['os', 'operating system', 'operating systems', 'process', 'processes', 'threads', 'scheduling', 'memory management', 'deadlock'],
      lessons: [
        { title: 'Introduction to Operating Systems', duration: '5 min read', intro: 'An operating system manages computer hardware and provides services that applications use.', sections: [['Main responsibilities', 'The operating system manages processes, memory, files, devices and security.'], ['Examples', 'Linux, Windows, macOS and Android are examples of operating systems.'], ['User and kernel modes', 'Modern operating systems use privilege levels to help protect the system from unsafe operations.']], takeaway: 'The operating system acts as a manager between applications and hardware.' },
        { title: 'Processes and Threads', duration: '7 min read', intro: 'A process is a program in execution. A thread is a unit of execution within a process.', sections: [['Process', 'A process has its own address space and resources managed by the operating system.'], ['Thread', 'Threads within the same process can share memory and resources, while each thread has its own execution state and stack.'], ['Context switching', 'The operating system saves the state of one task and restores another so the CPU can switch between tasks.']], takeaway: 'Processes provide isolation; threads allow concurrent work within a process.' },
        { title: 'CPU Scheduling', duration: '7 min read', intro: 'CPU scheduling decides which ready process or thread gets CPU time next.', sections: [['FCFS', 'First Come, First Served runs processes in arrival order.'], ['SJF and SRTF', 'Shortest Job First selects the shortest next CPU burst; Shortest Remaining Time First is its preemptive form.'], ['Round Robin', 'Round Robin gives each process a time quantum and then moves to the next ready process.']], takeaway: 'Different scheduling algorithms balance response time, waiting time and fairness differently.' },
        { title: 'Memory Management and Deadlocks', duration: '8 min read', intro: 'Memory management tracks and allocates memory. A deadlock occurs when tasks wait indefinitely for resources held by one another.', sections: [['Memory management', 'The operating system allocates and frees memory. Virtual memory gives processes an address space that can be mapped to physical memory.'], ['Paging', 'Paging divides virtual memory into fixed-size pages and physical memory into frames.'], ['Deadlock conditions', 'The four necessary conditions are mutual exclusion, hold and wait, no preemption and circular wait.']], takeaway: 'Understanding memory allocation and the four deadlock conditions is essential in OS.' }
      ]
    },
    cn: {
      title: 'Computer Networks',
      description: 'Learn how computers communicate through network models, protocols and routing.',
      aliases: ['cn', 'computer network', 'computer networks', 'networking', 'osi', 'tcp', 'tcp/ip', 'routing', 'protocols'],
      lessons: [
        { title: 'Introduction to Computer Networks', duration: '5 min read', intro: 'A computer network connects devices so they can exchange data and share resources.', sections: [['Network components', 'Devices communicate through wired or wireless links using network interface hardware and protocols.'], ['Types of networks', 'LAN covers a limited area, MAN covers a metropolitan area, and WAN spans large geographical areas.'], ['Protocols', 'Protocols define rules for communication, including message formats, addressing and error handling.']], takeaway: 'A network enables communication between connected devices using agreed protocols.' },
        { title: 'OSI Reference Model', duration: '8 min read', intro: 'The OSI model divides network communication into seven conceptual layers.', sections: [['Seven layers', 'From bottom to top: Physical, Data Link, Network, Transport, Session, Presentation and Application.'], ['Layer responsibilities', 'Physical transmits bits. Data Link handles frames and local delivery. Network handles logical addressing and routing. Transport provides end-to-end transport.'], ['Upper layers', 'Session manages dialogs, Presentation handles data representation, and Application provides network services to applications.']], takeaway: 'Remember the seven layers in order and understand the main responsibility of each.' },
        { title: 'TCP and UDP', duration: '7 min read', intro: 'TCP and UDP are transport-layer protocols with different delivery characteristics.', sections: [['TCP', 'TCP is connection-oriented and provides reliable, ordered byte-stream delivery using acknowledgements and retransmission.'], ['UDP', 'UDP is connectionless and has lower protocol overhead, but does not itself guarantee delivery or ordering.'], ['Choosing a protocol', 'Applications choose based on their needs. Reliability and ordering may favor TCP; low overhead and application-managed timing may favor UDP.']], takeaway: 'TCP emphasizes reliable ordered delivery; UDP provides a simpler datagram service.' },
        { title: 'IP Addressing and Routing', duration: '8 min read', intro: 'IP addressing identifies network interfaces logically, while routing moves packets between networks.', sections: [['IP address', 'An IP address is a logical address used to identify an interface on an IP network. IPv4 uses 32 bits; IPv6 uses 128 bits.'], ['Router', 'A router forwards packets between networks using routing information.'], ['Default gateway', 'A host commonly sends traffic for remote networks to a configured default gateway.']], takeaway: 'IP addresses support logical identification; routers forward packets toward their destinations.' }
      ]
    },
    oop: {
      title: 'Object-Oriented Programming',
      description: 'Learn to structure programs using classes, objects and core OOP principles.',
      aliases: ['oop', 'oops', 'object oriented programming', 'object-oriented programming', 'java', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction'],
      lessons: [
        { title: 'Classes and Objects', duration: '5 min read', intro: 'Object-oriented programming organizes software around objects that combine state and behavior.', sections: [['Class', 'A class is a blueprint that defines fields and methods.'], ['Object', 'An object is an instance of a class. Each object has its own state and can use the behavior defined by its class.'], ['Constructor', 'A constructor initializes a newly created object. In Java, its name matches the class name and it has no return type.']], code: 'class Student {\n  String name;\n  Student(String name) {\n    this.name = name;\n  }\n}', takeaway: 'A class defines a type; an object is an instance of that class.' },
        { title: 'Encapsulation and Abstraction', duration: '7 min read', intro: 'Encapsulation protects an object’s internal state. Abstraction exposes essential behavior while hiding implementation details.', sections: [['Encapsulation', 'Use access modifiers and methods to control how fields are accessed or changed.'], ['Abstraction', 'Abstract classes and interfaces can define what an object should do without exposing every implementation detail.'], ['Why they matter', 'Both ideas help manage complexity and make code easier to maintain.']], takeaway: 'Encapsulation controls access to data; abstraction hides unnecessary implementation details.' },
        { title: 'Inheritance', duration: '6 min read', intro: 'Inheritance allows a class to derive fields and methods from another class.', sections: [['Parent and child classes', 'A superclass contains common behavior. A subclass can reuse and extend that behavior.'], ['Java example', 'Java uses the extends keyword for class inheritance. A subclass can override an inherited method.'], ['Use carefully', 'Inheritance is useful for genuine is-a relationships. Composition can be a better choice when objects merely use one another.']], code: 'class Animal {\n  void eat() { System.out.println("Eating"); }\n}\nclass Dog extends Animal { }', takeaway: 'Inheritance supports reuse and specialization, but should model a meaningful is-a relationship.' },
        { title: 'Polymorphism', duration: '7 min read', intro: 'Polymorphism allows the same interface or method call to work with different object types.', sections: [['Method overloading', 'Overloading uses the same method name with different parameter lists. It is resolved at compile time.'], ['Method overriding', 'Overriding lets a subclass provide its own implementation of an inherited method.'], ['Runtime polymorphism', 'A superclass reference can refer to a subclass object. An overridden instance method is selected based on the actual object type.']], takeaway: 'Polymorphism makes code flexible by allowing different implementations behind a common type.' }
      ]
    },
    se: {
      title: 'Software Engineering',
      description: 'Understand the process of designing, building, testing and maintaining software.',
      aliases: ['software engineering', 'sdlc', 'software testing', 'testing', 'design patterns'],
      lessons: [
        { title: 'Introduction to Software Engineering', duration: '5 min read', intro: 'Software engineering applies systematic methods to develop, operate and maintain software.', sections: [['Why it matters', 'Engineering practices help teams manage complexity, quality, cost, schedules and changing requirements.'], ['Software qualities', 'Common quality attributes include reliability, usability, maintainability, security and performance.'], ['Teamwork', 'Software projects involve requirements, design, implementation, testing, deployment and maintenance.']], takeaway: 'Software engineering is about building and maintaining dependable software systematically.' },
        { title: 'Software Development Life Cycle', duration: '7 min read', intro: 'The Software Development Life Cycle (SDLC) describes stages commonly followed during software development.', sections: [['Typical stages', 'Requirements analysis, planning, design, implementation, testing, deployment and maintenance.'], ['Waterfall', 'Waterfall follows a largely sequential process where phases are completed in order.'], ['Agile', 'Agile approaches deliver work iteratively and encourage feedback and adaptation.']], takeaway: 'SDLC models organize development work; teams choose a model that fits the project.' },
        { title: 'Requirements and Design', duration: '7 min read', intro: 'Requirements describe what a system should do and the constraints under which it must operate.', sections: [['Functional requirements', 'Describe system behavior, such as allowing a user to sign in or search for a record.'], ['Non-functional requirements', 'Describe quality or constraints, such as performance, security, accessibility and availability.'], ['Design', 'Software design turns requirements into architecture, components, interfaces and data structures.']], takeaway: 'Clear requirements guide design and help teams decide what to build and how to evaluate it.' },
        { title: 'Software Testing', duration: '8 min read', intro: 'Software testing evaluates a system to find defects and check whether it meets requirements.', sections: [['Unit testing', 'Tests a small unit, such as a function or class, in isolation where practical.'], ['Integration testing', 'Checks whether components work correctly together.'], ['System and acceptance testing', 'System testing evaluates the complete system; acceptance testing checks whether it meets user or business needs.']], takeaway: 'Testing at multiple levels helps find problems early and improve software quality.' }
      ]
    }
  };

  const aliases = Object.entries(courses).flatMap(([key, course]) =>
    course.aliases.map(alias => ({ key, alias }))
  );
  const normalizedRequest = requestedTopic.toLowerCase();
  let courseKey = 'dsa';
  let matchedAlias = '';
  for (const item of aliases) {
    if (normalizedRequest === item.alias || normalizedRequest.includes(item.alias) || item.alias.includes(normalizedRequest)) {
      courseKey = item.key;
      matchedAlias = item.alias;
      break;
    }
  }
  const course = courses[courseKey];

  // If the query is a specific subtopic (for example, "Arrays"), open its closest lesson.
  let activeIndex = 0;
  if (matchedAlias) {
    const foundIndex = course.lessons.findIndex(lesson =>
      lesson.title.toLowerCase().includes(normalizedRequest) ||
      normalizedRequest.includes(lesson.title.toLowerCase().split(' ')[0])
    );
    if (foundIndex >= 0) activeIndex = foundIndex;
    if (courseKey === 'dsa' && ['array', 'arrays'].includes(matchedAlias)) activeIndex = 1;
    if (courseKey === 'dbms' && ['sql', 'normalization', 'transaction', 'transactions'].includes(matchedAlias)) activeIndex = matchedAlias === 'sql' ? 2 : 3;
    if (courseKey === 'os' && ['process', 'processes', 'threads', 'scheduling', 'deadlock'].includes(matchedAlias)) activeIndex = matchedAlias === 'scheduling' ? 2 : 1;
    if (courseKey === 'cn' && ['osi', 'tcp', 'tcp/ip', 'routing', 'protocols'].includes(matchedAlias)) activeIndex = matchedAlias === 'osi' ? 1 : matchedAlias === 'tcp' || matchedAlias === 'tcp/ip' ? 2 : 3;
    if (courseKey === 'oop' && ['inheritance', 'polymorphism', 'encapsulation', 'abstraction'].includes(matchedAlias)) activeIndex = matchedAlias === 'inheritance' ? 2 : matchedAlias === 'polymorphism' ? 3 : 1;
    if (courseKey === 'se' && ['sdlc', 'software testing', 'testing'].includes(matchedAlias)) activeIndex = matchedAlias === 'testing' || matchedAlias === 'software testing' ? 3 : 1;
  }

  const $ = id => document.getElementById(id);
  const student = readStorage('currentUser');
  const studentName = typeof student === 'string'
    ? student
    : student?.name || student?.username || student?.fullName || 'Student';
  const initial = studentName.trim().charAt(0).toUpperCase() || 'S';
  $('profileName').textContent = studentName;
  $('sidebarName').textContent = studentName;
  $('profileAvatar').textContent = initial;
  $('sidebarAvatar').textContent = initial;
  $('subjectName').textContent = course.title;
  $('welcomeTitle').textContent = `Let's learn ${course.title}.`;
  $('welcomeDescription').textContent = course.description;
  $('lessonCount').textContent = `${course.lessons.length} lessons`;

  const progress = readStorage(STORAGE_KEY) || {};
  if (!progress[courseKey]) progress[courseKey] = [];
  const completed = new Set(progress[courseKey]);

  function readStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch { return raw; }
    } catch (error) {
      console.warn(`Could not read ${key}`, error);
      return null;
    }
  }

  function saveProgress() {
    try {
      progress[courseKey] = [...completed];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      $('saveMessage').textContent = 'Progress saved on this device.';
    } catch (error) {
      $('saveMessage').textContent = 'Unable to save progress. Check your browser storage settings.';
      console.error('Could not save lesson progress:', error);
    }
  }

  function updateProgress() {
    const count = completed.size;
    const percent = Math.round((count / course.lessons.length) * 100);
    $('progressPercent').textContent = `${percent}%`;
    $('overallProgressFill').style.width = `${percent}%`;
    $('progressText').textContent = `${count} of ${course.lessons.length} lessons completed`;
  }

  function renderLessonList() {
    $('lessonList').innerHTML = '';
    course.lessons.forEach((lesson, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lesson-item';
      if (index === activeIndex) button.classList.add('active');
      if (completed.has(index)) button.classList.add('completed');
      button.setAttribute('aria-current', index === activeIndex ? 'step' : 'false');

      const number = document.createElement('span');
      number.className = 'lesson-number';
      number.textContent = completed.has(index) ? '✓' : String(index + 1).padStart(2, '0');

      const text = document.createElement('span');
      text.className = 'lesson-item-text';
      const title = document.createElement('strong');
      title.textContent = lesson.title;
      const meta = document.createElement('small');
      meta.textContent = completed.has(index) ? 'Completed' : lesson.duration;
      text.append(title, meta);
      button.append(number, text);
      button.addEventListener('click', () => {
        activeIndex = index;
        renderCurrentLesson();
      });
      $('lessonList').appendChild(button);
    });
  }

  function renderCurrentLesson() {
    const lesson = course.lessons[activeIndex];
    $('moduleTag').textContent = `MODULE ${String(activeIndex + 1).padStart(2, '0')}`;
    $('lessonDuration').textContent = lesson.duration;
    $('lessonTitle').textContent = lesson.title;
    $('lessonIntro').textContent = lesson.intro;
    $('lessonBody').innerHTML = '';

    lesson.sections.forEach(([heading, paragraph]) => {
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = heading;
      const sectionText = document.createElement('p');
      sectionText.textContent = paragraph;
      $('lessonBody').append(sectionTitle, sectionText);
    });

    if (lesson.code) {
      const codeTitle = document.createElement('h3');
      codeTitle.textContent = 'Example';
      const code = document.createElement('pre');
      code.className = 'code-example';
      code.textContent = lesson.code;
      $('lessonBody').append(codeTitle, code);
    }

    const takeaway = document.createElement('div');
    takeaway.className = 'concept-box';
    const takeawayTitle = document.createElement('strong');
    takeawayTitle.textContent = 'KEY TAKEAWAY';
    const takeawayText = document.createElement('p');
    takeawayText.textContent = lesson.takeaway;
    takeaway.append(takeawayTitle, takeawayText);
    $('lessonBody').appendChild(takeaway);

    $('previousButton').disabled = activeIndex === 0;
    $('nextButton').textContent = activeIndex === course.lessons.length - 1 ? 'Finish course ✓' : 'Next lesson →';
    $('nextButton').disabled = activeIndex === course.lessons.length - 1 && completed.size !== course.lessons.length;
    $('completeButton').textContent = completed.has(activeIndex) ? '✓ Completed' : '✓ Mark as completed';
    $('completeButton').classList.toggle('done', completed.has(activeIndex));
    renderLessonList();
    updateProgress();

    const practiceUrl = new URL('practice.html', window.location.href);
    practiceUrl.searchParams.set('topic', requestedTopic);
    $('practiceLink').href = practiceUrl.href;
  }

  $('completeButton').addEventListener('click', () => {
    completed.add(activeIndex);
    saveProgress();
    renderCurrentLesson();
    if (completed.size === course.lessons.length) {
      $('saveMessage').textContent = 'Excellent! You completed every lesson in this subject.';
    }
  });

  $('previousButton').addEventListener('click', () => {
    if (activeIndex > 0) {
      activeIndex--;
      renderCurrentLesson();
    }
  });

  $('nextButton').addEventListener('click', () => {
    if (activeIndex < course.lessons.length - 1) {
      activeIndex++;
      renderCurrentLesson();
    } else if (completed.size === course.lessons.length) {
      $('saveMessage').textContent = 'Course completed. Great work!';
    }
  });

  updateProgress();
  renderCurrentLesson();
});