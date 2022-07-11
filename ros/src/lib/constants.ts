module.exports = {
	EVENT_CONNECTED: "connected",
	EVENT_DISCONNECTED: "disconnected",

	// The goal has yet to be processed by the action server
	OUTPUT_PENDING: 0,
	// The goal is currently being processed by the action server
	OUTPUT_ACTIVE: 1,
	// The goal received a cancel request after it started executing and has since completed its execution (Terminal State)
	OUTPUT_PREEMPTED: 2,
	// The goal was achieved successfully by the action server (Terminal State)
	OUTPUT_SUCCEEDED: 3,
	// The goal was aborted during execution by the action server due to some failure (Terminal State)
	OUTPUT_ABORTED: 4,
	// The goal was rejected by the action server without being processed, because the goal was unattainable or invalid (Terminal State)
	OUTPUT_REJECTED: 5,
	// The goal received a cancel request after it started executing and has not yet completed execution
	OUTPUT_PREEMPTING: 6,
	// The goal received a cancel request before it started executing, but the action server has not yet confirmed that the goal is canceled
	OUTPUT_RECALLING: 7,
	// The goal received a cancel request before it started executing and was successfully cancelled (Terminal State)
	OUTPUT_RECALLED: 8,
	// An action client can determine that a goal is LOST. This should not be sent over the wire by an action server
	OUTPUT_LOST: 9,
	OUTPUT_OVERWRITING: 10,
	OUTPUT_OVERWRITTEN: 11,
	OUTPUT_STALLED: 12,
	OUTPUT_BUSY: 13
};