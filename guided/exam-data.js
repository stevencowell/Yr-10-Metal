window.EXAM_DATA = {
  storageKey: "year10-metal:formal-exam:v1",
  multipleChoice: [
    ["The part of a file that fits into its handle is the:", ["tang", "face", "point", "heel"]],
    ["On a file, ‘second cut’ refers to its:", ["degree of tooth coarseness", "tooth pattern", "material removed per stroke", "cross-sectional shape"]],
    ["When fitting a hacksaw blade, the blade teeth should:", ["point away from the handle", "point towards the operator", "face either direction", "be removed with the frame prongs"]],
    ["Which tool scribes a line parallel to a straight edge?", ["Dividers", "Jenny callipers", "Scriber", "Scratch awl"]],
    ["Dividers set to 100 mm will scribe a circle with what diameter?", ["50 mm", "100 mm", "150 mm", "200 mm"]],
    ["To drill an accurate hole in mild-steel flat bar on a pedestal drill, the work should be secured in a:", ["drill vice", "pair of pliers", "bench vice away from the drill", "bare hand"]],
    ["Cutting an internal thread is called:", ["threading", "die-threading", "tapping", "screw-threading"]],
    ["If a tap-drill hole is the same size as the tap’s major diameter, what is the likely result?", ["The thread will be oversized", "The tap will not cut a full thread", "The tap must break", "A full thread will be produced"]],
    ["The end of a rod is chamfered before die threading mainly to:", ["check perpendicularity", "reach full diameter immediately", "remove the die more easily", "help the die start cutting"]],
    ["If a lathe tool is set below centre during facing, the likely result is:", ["the tool rides up", "the tool digs in", "a central nib remains", "unavoidable chatter"]],
    ["Which lathe operation should be completed first when an accurate bar length is required?", ["Parallel turning", "Centre drilling", "Taper turning", "Facing"]],
    ["A neutral oxy-acetylene flame is used for:", ["general-purpose welding", "welding bronze alloys only", "surface hardening", "silver soldering copper"]],
    ["In welding, ‘parent metal’ means:", ["electrode core", "metal being welded", "deposited weld bead", "electrode flux coating"]],
    ["The correct name for stick welding is:", ["manual metal arc welding", "gas metal arc welding", "gas tungsten arc welding", "fusion welding"]],
    ["Safety glasses are required when using:", ["an angle grinder only", "a lathe only", "a cold saw only", "all listed machines"]],
    ["Before drilling mild steel, which tool makes an indent that helps stop the drill wandering?", ["Scriber", "Centre punch", "Cold chisel", "Drift"]],
    ["Which hacksaw blade is most suitable for thin-walled tube?", ["14 TPI", "18 TPI", "24 TPI", "32 TPI"]],
    ["Which hand tap is used first when cutting an internal thread?", ["Plug tap", "Bottoming tap", "Taper/first tap", "Spiral-point tap"]]
  ],
  drawing: [
    ["State the length of the long arm identified on the frame.", 1],
    ["State the three dimensions of the foot on the frame. Use the format ___ × ___ × ___ mm.", 3],
    ["State the diameter of the pad.", 1],
    ["State the thread size on the clamp screw.", 2],
    ["Copy the tolerance specified for the adjustable arm.", 1],
    ["Calculate the tapping-drill size for the M12 × 1.75 thread on the adjustable arm. Show the calculation.", 2]
  ],
  short: [
    { q: "Enter the vernier-calliper measurement indicated by the two aligned scale lines. Include the unit.", marks: 2, image: "assets/exam/vernier-source.png", alt: "Source vernier-calliper stimulus" },
    { q: "Name the two tools used to cut an internal thread by hand.", marks: 2 },
    { q: "Name the two tools used to cut an external thread by hand.", marks: 2 },
    { q: "Explain why a centre drill is used before drilling on a metal lathe.", marks: 2 },
    { q: "List five safety considerations that apply when using the MIG/GMA welder. Your response will be judged against the teacher-approved local procedure.", marks: 5 },
    { q: "Calculate the required tap-drill size for M6 × 1, M10 × 1.5 and M12 × 1.75. Show each calculation.", marks: 3 },
    { q: "For each source diagram, identify the lathe process and explain what is happening.", marks: 12, operations: ["assets/exam/lathe-operation-1.png", "assets/exam/lathe-operation-2.png", "assets/exam/lathe-operation-3.png"] },
    { q: "State what happens to the required pedestal-drill speed as drill diameter increases.", marks: 1 },
    { q: "Using RPM = 300 × V ÷ diameter and V = 30 for mild steel, calculate the RPM for drill diameters of 5 mm, 8 mm and 15 mm. Show working.", marks: 3 },
    { q: "Using the source photograph, identify where each of these ten parts is located: tool post; compound slide; tailstock; tailstock handwheel; apron; carriage handwheel; cross-slide handwheel; compound-slide handwheel; chuck; headstock.", marks: 10, image: "assets/exam/centre-lathe-source.jpg", alt: "Source centre-lathe photograph" }
  ]
};
