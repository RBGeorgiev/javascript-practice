export const population = [
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 1.0157633922830316,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.11601950682768358,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 15
            }
        ],
        "connections": [
            {
                "weight": -0.08850650433001804,
                "from": 15,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 15,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 14,
                "gater": 12
            },
            {
                "weight": -0.06318063948262115,
                "from": 14,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.09734265152602117,
                "from": 15,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 14,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 14,
                "to": 9,
                "gater": 15
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.07540312349344166,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 11,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 14,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 14,
                "gater": null
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.013392904867697994,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": 12
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": null
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.03925746249511661,
                "from": 4,
                "to": 15,
                "gater": 12
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.07468257724596891,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": -0.051102102241076836,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.10508120948873734,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 13
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 14
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 16
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 17
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 15,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08850650433001804,
                "from": 17,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 15,
                "to": 17,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 13,
                "to": 17,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 17,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 16,
                "gater": 13
            },
            {
                "weight": -0.06318063948262115,
                "from": 16,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.09734265152602117,
                "from": 17,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 17,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.010138017696543461,
                "from": 13,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.012287733029395523,
                "from": 15,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 17,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 16,
                "to": 9,
                "gater": 17
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 17,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 17,
                "gater": null
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 17,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 17,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 13,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 13
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 15,
                "gater": 13
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 17,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.013392904867697994,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 17,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 14,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": null
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 13,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.03297642620191575,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.02172879674827058,
                "from": 12,
                "to": 13,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.07468257724596891,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.10508120948873734,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": -0.08850650433001804,
                "from": 16,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": -0.06318063948262115,
                "from": 15,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.012287733029395523,
                "from": 14,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": 16
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.07540312349344166,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": null
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.013392904867697994,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": 16
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.07468257724596891,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.10508120948873734,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.08850650433001804,
                "from": 16,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": -0.06318063948262115,
                "from": 15,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.012287733029395523,
                "from": 14,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": 16
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.1445472895401457,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": null
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": 14
            },
            {
                "weight": -0.05360323029800913,
                "from": 6,
                "to": 14,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.07468257724596891,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.10508120948873734,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.08850650433001804,
                "from": 16,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.009237868567962423,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.012287733029395523,
                "from": 14,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": 16
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.1445472895401457,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": 11
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": 15
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.10508120948873734,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.08850650433001804,
                "from": 16,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.009237868567962423,
                "from": 12,
                "to": 13,
                "gater": 14
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.07540312349344166,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": 13
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8199984871362829,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "ABSOLUTE",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.10508120948873734,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.08850650433001804,
                "from": 16,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.06043045969133318,
                "from": 9,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.009237868567962423,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.5439520085464625,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.07540312349344166,
                "from": 11,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": null
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 12
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.05395911792786731,
                "from": 7,
                "to": 10,
                "gater": null
            },
            {
                "weight": 1.378556146183887,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": 11
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.07185434942099941,
                "from": 2,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": 15
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 1.7036385307496333,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": 9
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.016577907021995214,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": 14
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 11
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": 9
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.021244626185001975,
                "from": 7,
                "to": 13,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 1.7036385307496333,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": 9
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.016577907021995214,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": 14
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 11
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": 9
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.021244626185001975,
                "from": 7,
                "to": 13,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 1.1030748001535189,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.009237868567962423,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9486549628908071,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": 14
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 11
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": 15
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 1.7036385307496333,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": 12
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": 9
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.016577907021995214,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": 14
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.9340784445641699,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": 11
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": 9
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.09752096713380687,
                "from": 16,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.009237868567962423,
                "from": 12,
                "to": 13,
                "gater": 14
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": 14
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.9340784445641699,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": 11
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.11782426816046683,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 1.1327895861371178,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 1.1030748001535189,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.0539933909870047,
                "from": 15,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.016577907021995214,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.02468687166784851,
                "from": 12,
                "to": 11,
                "gater": 14
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.041984707144233815,
                "from": 12,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.07223084773972901,
                "from": 8,
                "to": 11,
                "gater": null
            },
            {
                "weight": -0.8718544545025864,
                "from": 9,
                "to": 10,
                "gater": 11
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": 12
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 11,
                "gater": 9
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 12,
                "to": 12,
                "gater": null
            },
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05343322454143623,
                "from": 16,
                "to": 13,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.003843586934509438,
                "from": 16,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": 0.09734265152602117,
                "from": 16,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.016577907021995214,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 1.3165416350618,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": null
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.11782426816046683,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": 13
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.047875664145187714,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    },
    {
        "nodes": [
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 0
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 1
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 2
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 3
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 4
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 5
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 6
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 7
            },
            {
                "bias": 0,
                "type": "input",
                "squash": "LOGISTIC",
                "mask": 1,
                "index": 8
            },
            {
                "bias": 0.9821360086461048,
                "type": "hidden",
                "squash": "GAUSSIAN",
                "mask": 1,
                "index": 9
            },
            {
                "bias": 0.8572270230294117,
                "type": "hidden",
                "squash": "BENT_IDENTITY",
                "mask": 1,
                "index": 10
            },
            {
                "bias": 0.59696195110902,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 11
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 12
            },
            {
                "bias": 0.9340873819483715,
                "type": "hidden",
                "squash": "TANH",
                "mask": 1,
                "index": 13
            },
            {
                "bias": -0.05629474337985361,
                "type": "hidden",
                "squash": "BIPOLAR_SIGMOID",
                "mask": 1,
                "index": 14
            },
            {
                "bias": 0.03575254855199991,
                "type": "output",
                "squash": "SELU",
                "mask": 1,
                "index": 15
            },
            {
                "bias": 0.214176600934575,
                "type": "output",
                "squash": "SINUSOID",
                "mask": 1,
                "index": 16
            }
        ],
        "connections": [
            {
                "weight": 1,
                "from": 14,
                "to": 14,
                "gater": null
            },
            {
                "weight": -0.09646264610824465,
                "from": 14,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.05660057336438254,
                "from": 13,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.024947135756695715,
                "from": 15,
                "to": 14,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 16,
                "gater": null
            },
            {
                "weight": 0.030034942614118737,
                "from": 13,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 12,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.003843586934509438,
                "from": 16,
                "to": 11,
                "gater": null
            },
            {
                "weight": 0.0696837889964455,
                "from": 11,
                "to": 15,
                "gater": 12
            },
            {
                "weight": -0.02069296849327666,
                "from": 10,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.016577907021995214,
                "from": 12,
                "to": 13,
                "gater": null
            },
            {
                "weight": 2.168855279956659,
                "from": 8,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.08085932659593863,
                "from": 15,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.33079236149844077,
                "from": 7,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.05130402539919143,
                "from": 8,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.9038172228053707,
                "from": 6,
                "to": 16,
                "gater": 13
            },
            {
                "weight": 3.818764261794661,
                "from": 7,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.06318063948262115,
                "from": 12,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.037405206608005725,
                "from": 6,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.7763262644650153,
                "from": 5,
                "to": 15,
                "gater": 11
            },
            {
                "weight": 0.28994902430232483,
                "from": 3,
                "to": 16,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.0882161255899074,
                "from": 7,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.015087256863438106,
                "from": 9,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.05605455979261831,
                "from": 3,
                "to": 15,
                "gater": null
            },
            {
                "weight": 0.0619985419576321,
                "from": 4,
                "to": 14,
                "gater": null
            },
            {
                "weight": 3.025207162810186,
                "from": 8,
                "to": 10,
                "gater": null
            },
            {
                "weight": 3.612593028935495,
                "from": 1,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.9768167742526525,
                "from": 2,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.08368826219777326,
                "from": 6,
                "to": 11,
                "gater": 10
            },
            {
                "weight": 0.49242909496375703,
                "from": 8,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.07237400080798051,
                "from": 0,
                "to": 16,
                "gater": null
            },
            {
                "weight": -0.09119677298206592,
                "from": 1,
                "to": 15,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 13,
                "gater": null
            },
            {
                "weight": 1.3092575438030996,
                "from": 4,
                "to": 12,
                "gater": null
            },
            {
                "weight": -0.11782426816046683,
                "from": 5,
                "to": 11,
                "gater": null
            },
            {
                "weight": 2.927686959044698,
                "from": 6,
                "to": 10,
                "gater": 10
            },
            {
                "weight": 0.06097937195362749,
                "from": 7,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.02195529647439924,
                "from": 3,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.024514358727249205,
                "from": 5,
                "to": 10,
                "gater": null
            },
            {
                "weight": 0.49919260237801655,
                "from": 3,
                "to": 11,
                "gater": null
            },
            {
                "weight": -0.07879265992819154,
                "from": 4,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.14849570805680265,
                "from": 5,
                "to": 9,
                "gater": null
            },
            {
                "weight": 0.09225768925500719,
                "from": 1,
                "to": 12,
                "gater": null
            },
            {
                "weight": 0.2295484554656102,
                "from": 3,
                "to": 9,
                "gater": null
            },
            {
                "weight": -0.08973544276966364,
                "from": 0,
                "to": 11,
                "gater": null
            },
            {
                "weight": 3.585427822487267,
                "from": 1,
                "to": 10,
                "gater": null
            },
            {
                "weight": -0.08938133522147917,
                "from": 2,
                "to": 9,
                "gater": null
            }
        ],
        "input": 9,
        "output": 2,
        "dropout": 0
    }
]