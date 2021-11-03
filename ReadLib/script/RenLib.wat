(module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (import "env" "_Z4growj" (func $_Z4growj (param i32) (result i32)))
 (import "env" "_Z7loadingjj" (func $_Z7loadingjj (param i32 i32)))
 (import "env" "_Z9getBufferPhj" (func $_Z9getBufferPhj (param i32 i32) (result i32)))
 (import "env" "memset" (func $memset (param i32 i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 67)
 (data (i32.const 1060) "\00\00\00\00")
 (data (i32.const 1064) "\01\00\00\00")
 (data (i32.const 1068) "\02\00\00\00")
 (data (i32.const 1072) "\03\00\00\00")
 (data (i32.const 1076) "\04\00\00\00")
 (data (i32.const 1080) "\05\00\00\00")
 (data (i32.const 4331584) "\00\00\00\00")
 (data (i32.const 4331588) "\00\00\00\00")
 (data (i32.const 4331592) "\00\00\00\00")
 (data (i32.const 4331600) "ABCDEFGHIJKLMNOPQRSTUVWXYZ\00")
 (data (i32.const 4331628) "P\18B\00")
 (data (i32.const 4331632) "0123456789\00")
 (data (i32.const 4331644) "p\18B\00")
 (data (i32.const 4331664) "newCPoint\00")
 (data (i32.const 4331680) "newCPoint end\00")
 (data (i32.const 4331696) "newMoveNode\00")
 (data (i32.const 4331712) "newMoveNode end\00")
 (data (i32.const 4331728) "\00\00\00\00")
 (data (i32.const 4331732) "\00\00\00\00")
 (data (i32.const 4331736) "\00\00\00\00")
 (data (i32.const 4331740) "\00\00\00\00")
 (data (i32.const 4331744) "m_MoveList SetRoot()\00")
 (data (i32.const 4331776) "m_MoveList Add()\00")
 (data (i32.const 4331808) "getVariant()\00")
 (data (i32.const 4331824) "getVariant return <<\00")
 (data (i32.const 4331848) "\00\00\00\00")
 (data (i32.const 4331856) "wasm >> init\00")
 (data (i32.const 4331872) "reset m_file\00")
 (data (i32.const 4331888) "\ffRenLib\ff\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 4331920) "checking code\00")
 (export "memory" (memory $0))
 (export "_Z12getOutBufferv" (func $_Z12getOutBufferv))
 (export "_Z11getInBufferv" (func $_Z11getInBufferv))
 (export "_Z3logPKc" (func $_Z3logPKc))
 (export "_Z3logPc" (func $_Z3logPc))
 (export "_Z7onErrorPKc" (func $_Z7onErrorPKc))
 (export "_Z12getLogBufferv" (func $_Z12getLogBufferv))
 (export "_Z14getErrorBufferv" (func $_Z14getErrorBufferv))
 (export "_Z10findStringPcjS_j" (func $_Z10findStringPcjS_j))
 (export "_Z9putStringPcS_j" (func $_Z9putStringPcS_j))
 (export "_Z11pushCommentPcj" (func $_Z11pushCommentPcj))
 (export "_Z16getCommentBufferv" (func $_Z16getCommentBufferv))
 (export "_Z13pushBoardTextPcj" (func $_Z13pushBoardTextPcj))
 (export "_Z18getBoardTextBufferv" (func $_Z18getBoardTextBufferv))
 (export "_Z13getDataBufferv" (func $_Z13getDataBufferv))
 (export "_Z9newBufferj" (func $_Z9newBufferj))
 (export "_Z16getLibFileBufferv" (func $_Z16getLibFileBufferv))
 (export "_Z9newCPointv" (func $_Z9newCPointv))
 (export "_Z9newCPointhh" (func $_Z9newCPointhh))
 (export "_Z14test_newCPointj" (func $_Z14test_newCPointj))
 (export "_Z7isValid6CPoint" (func $_Z7isValid6CPoint))
 (export "_Z10bit_is_oneij" (func $_Z10bit_is_oneij))
 (export "_Z7set_bitiRj" (func $_Z7set_bitiRj))
 (export "_Z9clear_bitiRj" (func $_Z9clear_bitiRj))
 (export "_Z12isValidPoint6CPoint" (func $_Z12isValidPoint6CPoint))
 (export "_Z7isEmptyPc" (func $_Z7isEmptyPc))
 (export "_Z10PosToPointh" (func $_Z10PosToPointh))
 (export "_Z10PointToPos6CPoint" (func $_Z10PointToPos6CPoint))
 (export "_Z11newMoveNodev" (func $_Z11newMoveNodev))
 (export "_Z11newMoveNodeR8MoveNode" (func $_Z11newMoveNodeR8MoveNode))
 (export "_Z11newMoveNode6CPoint" (func $_Z11newMoveNode6CPoint))
 (export "_Z16test_newMoveNodej" (func $_Z16test_newMoveNodej))
 (export "_Z3msbh" (func $_Z3msbh))
 (export "_Z8LessThan6CPointS_" (func $_Z8LessThan6CPointS_))
 (export "_Z14readOldCommentPc" (func $_Z14readOldCommentPc))
 (export "_Z14readNewCommentPc" (func $_Z14readNewCommentPc))
 (export "_Z13readBoardTextPc" (func $_Z13readBoardTextPc))
 (export "_Z7addMoveP8MoveNodeS0_" (func $_Z7addMoveP8MoveNodeS0_))
 (export "_Z13addAttributesP8MoveNodeS0_RbS1_S1_" (func $_Z13addAttributesP8MoveNodeS0_RbS1_S1_))
 (export "_Z10getVariantP8MoveNode6CPoint" (func $_Z10getVariantP8MoveNode6CPoint))
 (export "_Z11getAutoMovev" (func $_Z11getAutoMovev))
 (export "_Z15test_getVariantv" (func $_Z15test_getVariantv))
 (export "_Z8findNodeRP8MoveNode6CPoint" (func $_Z8findNodeRP8MoveNode6CPoint))
 (export "_Z19searchInnerHTMLInfoP6CPointj" (func $_Z19searchInnerHTMLInfoP6CPointj))
 (export "_Z7indexOf6CPointPS_i" (func $_Z7indexOf6CPointPS_i))
 (export "_Z11indexOfNode6CPointP4Nodei" (func $_Z11indexOfNode6CPointP4Nodei))
 (export "_Z14getBranchNodesP6CPointi" (func $_Z14getBranchNodesP6CPointi))
 (export "_Z22getMoveNodeCountBufferv" (func $_Z22getMoveNodeCountBufferv))
 (export "_Z12checkVersionv" (func $_Z12checkVersionv))
 (export "_Z15loadAllMoveNodev" (func $_Z15loadAllMoveNodev))
 (export "_Z15createRenjuTreev" (func $_Z15createRenjuTreev))
 (export "_Z10addLibraryv" (func $_Z10addLibraryv))
 (export "_Z4initj" (func $_Z4initj))
 (func $_Z12getOutBufferv (; 4 ;) (result i32)
  (i32.const 1088)
 )
 (func $_Z11getInBufferv (; 5 ;) (result i32)
  (i32.const 67648)
 )
 (func $_Z3logPKc (; 6 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $1
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $1)
       (i32.const 134208)
      )
      (get_local $2)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $1)
       (i32.const 2097150)
      )
     )
     (set_local $2
      (i32.load8_u
       (get_local $0)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$2
      (i32.and
       (get_local $2)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z3logPc (; 7 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $1
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $1)
       (i32.const 134208)
      )
      (get_local $2)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $1)
       (i32.const 2097150)
      )
     )
     (set_local $2
      (i32.load8_u
       (get_local $0)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$2
      (i32.and
       (get_local $2)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z7onErrorPKc (; 8 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $2
      (i32.load offset=1064
       (i32.const 0)
      )
     )
     (i32.const 1048574)
    )
   )
   (set_local $3
    (i32.const 10)
   )
   (set_local $1
    (get_local $0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $2)
       (i32.const 2232384)
      )
      (get_local $3)
     )
     (i32.store offset=1064
      (i32.const 0)
      (tee_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
     )
     (br_if $label$1
      (i32.gt_u
       (get_local $2)
       (i32.const 1048574)
      )
     )
     (set_local $3
      (i32.load8_u
       (get_local $1)
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 1)
      )
     )
     (br_if $label$2
      (i32.and
       (get_local $3)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $2)
     (i32.const 2232384)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.gt_u
     (tee_local $2
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $3
    (i32.const 10)
   )
   (block $label$4
    (loop $label$5
     (i32.store8
      (i32.add
       (get_local $2)
       (i32.const 134208)
      )
      (get_local $3)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
     )
     (br_if $label$4
      (i32.gt_u
       (get_local $2)
       (i32.const 2097150)
      )
     )
     (set_local $3
      (i32.load8_u
       (get_local $0)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$5
      (i32.and
       (get_local $3)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $2)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z12getLogBufferv (; 9 ;) (result i32)
  (i32.const 134208)
 )
 (func $_Z14getErrorBufferv (; 10 ;) (result i32)
  (i32.const 2232384)
 )
 (func $_Z10findStringPcjS_j (; 11 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $5
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (i32.add
       (tee_local $4
        (i32.sub
         (i32.add
          (get_local $0)
          (get_local $1)
         )
         (get_local $3)
        )
       )
       (i32.const 1)
      )
      (get_local $0)
     )
    )
    (loop $label$2
     (set_local $1
      (i32.const 0)
     )
     (block $label$3
      (loop $label$4
       (br_if $label$3
        (i32.ne
         (tee_local $5
          (i32.load8_u
           (i32.add
            (get_local $0)
            (get_local $1)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $2)
           (get_local $1)
          )
         )
        )
       )
       (br_if $label$4
        (i32.lt_u
         (tee_local $1
          (i32.add
           (get_local $1)
           (i32.const 1)
          )
         )
         (get_local $3)
        )
       )
       (br $label$0)
      )
     )
     (block $label$5
      (br_if $label$5
       (i32.eqz
        (get_local $5)
       )
      )
      (loop $label$6
       (br_if $label$6
        (i32.load8_u
         (tee_local $0
          (i32.add
           (get_local $0)
           (i32.const 1)
          )
         )
        )
       )
      )
     )
     (loop $label$7
      (br_if $label$7
       (i32.eqz
        (i32.load8_u
         (tee_local $0
          (i32.add
           (get_local $0)
           (i32.const 1)
          )
         )
        )
       )
      )
     )
     (set_local $5
      (i32.const 0)
     )
     (br_if $label$2
      (i32.lt_u
       (i32.add
        (get_local $0)
        (i32.const -1)
       )
       (get_local $4)
      )
     )
    )
   )
   (return
    (get_local $5)
   )
  )
  (get_local $0)
 )
 (func $_Z9putStringPcS_j (; 12 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $2)
    )
   )
   (loop $label$1
    (i32.store8
     (get_local $0)
     (i32.load8_u
      (get_local $1)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 1)
     )
    )
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
    (br_if $label$1
     (tee_local $2
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
   )
  )
 )
 (func $_Z11pushCommentPcj (; 13 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (set_local $8
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (i32.add
       (tee_local $3
        (i32.sub
         (tee_local $2
          (i32.add
           (tee_local $6
            (i32.load offset=4331584
             (i32.const 0)
            )
           )
           (tee_local $7
            (i32.load offset=1068
             (i32.const 0)
            )
           )
          )
         )
         (get_local $1)
        )
       )
       (i32.const 1)
      )
      (get_local $6)
     )
    )
    (loop $label$2
     (set_local $5
      (i32.const 0)
     )
     (block $label$3
      (loop $label$4
       (br_if $label$3
        (i32.ne
         (tee_local $4
          (i32.load8_u
           (i32.add
            (get_local $6)
            (get_local $5)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $0)
           (get_local $5)
          )
         )
        )
       )
       (br_if $label$4
        (i32.lt_u
         (tee_local $5
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $1)
        )
       )
       (br $label$0)
      )
     )
     (block $label$5
      (br_if $label$5
       (i32.eqz
        (get_local $4)
       )
      )
      (loop $label$6
       (br_if $label$6
        (i32.load8_u
         (tee_local $6
          (i32.add
           (get_local $6)
           (i32.const 1)
          )
         )
        )
       )
      )
     )
     (loop $label$7
      (br_if $label$7
       (i32.eqz
        (i32.load8_u
         (tee_local $6
          (i32.add
           (get_local $6)
           (i32.const 1)
          )
         )
        )
       )
      )
     )
     (br_if $label$2
      (i32.lt_u
       (i32.add
        (get_local $6)
        (i32.const -1)
       )
       (get_local $3)
      )
     )
    )
   )
   (block $label$8
    (br_if $label$8
     (i32.gt_u
      (i32.add
       (get_local $7)
       (get_local $1)
      )
      (i32.const 2097152)
     )
    )
    (block $label$9
     (br_if $label$9
      (i32.eqz
       (get_local $1)
      )
     )
     (set_local $5
      (get_local $1)
     )
     (set_local $6
      (get_local $2)
     )
     (loop $label$10
      (i32.store8
       (get_local $6)
       (i32.load8_u
        (get_local $0)
       )
      )
      (set_local $6
       (i32.add
        (get_local $6)
        (i32.const 1)
       )
      )
      (set_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
      (br_if $label$10
       (tee_local $5
        (i32.add
         (get_local $5)
         (i32.const -1)
        )
       )
      )
     )
     (set_local $7
      (i32.load offset=1068
       (i32.const 0)
      )
     )
    )
    (i32.store offset=1068
     (i32.const 0)
     (i32.add
      (get_local $7)
      (get_local $1)
     )
    )
    (set_local $8
     (get_local $2)
    )
   )
   (return
    (get_local $8)
   )
  )
  (get_local $6)
 )
 (func $_Z16getCommentBufferv (; 14 ;) (result i32)
  (i32.load offset=4331584
   (i32.const 0)
  )
 )
 (func $_Z13pushBoardTextPcj (; 15 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (set_local $8
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (i32.add
       (tee_local $3
        (i32.sub
         (tee_local $2
          (i32.add
           (tee_local $6
            (i32.load offset=4331588
             (i32.const 0)
            )
           )
           (tee_local $7
            (i32.load offset=1072
             (i32.const 0)
            )
           )
          )
         )
         (get_local $1)
        )
       )
       (i32.const 1)
      )
      (get_local $6)
     )
    )
    (loop $label$2
     (set_local $5
      (i32.const 0)
     )
     (block $label$3
      (loop $label$4
       (br_if $label$3
        (i32.ne
         (tee_local $4
          (i32.load8_u
           (i32.add
            (get_local $6)
            (get_local $5)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $0)
           (get_local $5)
          )
         )
        )
       )
       (br_if $label$4
        (i32.lt_u
         (tee_local $5
          (i32.add
           (get_local $5)
           (i32.const 1)
          )
         )
         (get_local $1)
        )
       )
       (br $label$0)
      )
     )
     (block $label$5
      (br_if $label$5
       (i32.eqz
        (get_local $4)
       )
      )
      (loop $label$6
       (br_if $label$6
        (i32.load8_u
         (tee_local $6
          (i32.add
           (get_local $6)
           (i32.const 1)
          )
         )
        )
       )
      )
     )
     (loop $label$7
      (br_if $label$7
       (i32.eqz
        (i32.load8_u
         (tee_local $6
          (i32.add
           (get_local $6)
           (i32.const 1)
          )
         )
        )
       )
      )
     )
     (br_if $label$2
      (i32.lt_u
       (i32.add
        (get_local $6)
        (i32.const -1)
       )
       (get_local $3)
      )
     )
    )
   )
   (block $label$8
    (br_if $label$8
     (i32.gt_u
      (i32.add
       (get_local $7)
       (get_local $1)
      )
      (i32.const 67108864)
     )
    )
    (block $label$9
     (br_if $label$9
      (i32.eqz
       (get_local $1)
      )
     )
     (set_local $5
      (get_local $1)
     )
     (set_local $6
      (get_local $2)
     )
     (loop $label$10
      (i32.store8
       (get_local $6)
       (i32.load8_u
        (get_local $0)
       )
      )
      (set_local $6
       (i32.add
        (get_local $6)
        (i32.const 1)
       )
      )
      (set_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
      (br_if $label$10
       (tee_local $5
        (i32.add
         (get_local $5)
         (i32.const -1)
        )
       )
      )
     )
     (set_local $7
      (i32.load offset=1072
       (i32.const 0)
      )
     )
    )
    (i32.store offset=1072
     (i32.const 0)
     (i32.add
      (get_local $7)
      (get_local $1)
     )
    )
    (set_local $8
     (get_local $2)
    )
   )
   (return
    (get_local $8)
   )
  )
  (get_local $6)
 )
 (func $_Z18getBoardTextBufferv (; 16 ;) (result i32)
  (i32.load offset=4331588
   (i32.const 0)
  )
 )
 (func $_Z13getDataBufferv (; 17 ;) (result i32)
  (i32.load offset=4331592
   (i32.const 0)
  )
 )
 (func $_Z9newBufferj (; 18 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $1
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (get_local $0)
   )
  )
  (i32.add
   (get_local $1)
   (i32.load offset=4331592
    (i32.const 0)
   )
  )
 )
 (func $_Z16getLibFileBufferv (; 19 ;) (result i32)
  (i32.const 3281984)
 )
 (func $_Z9newCPointv (; 20 ;) (result i32)
  (local $0 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $0
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 2)
   )
  )
  (i32.store16 align=1
   (tee_local $0
    (i32.add
     (get_local $0)
     (i32.load offset=4331592
      (i32.const 0)
     )
    )
   )
   (i32.const 0)
  )
  (get_local $0)
 )
 (func $_Z9newCPointhh (; 21 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $2
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 2)
   )
  )
  (i32.store8
   (tee_local $2
    (i32.add
     (get_local $2)
     (i32.load offset=4331592
      (i32.const 0)
     )
    )
   )
   (get_local $0)
  )
  (i32.store8 offset=1
   (get_local $2)
   (get_local $1)
  )
  (get_local $2)
 )
 (func $_Z14test_newCPointj (; 22 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $5
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $4
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $6
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $2
        (i32.add
         (get_local $4)
         (get_local $5)
        )
       )
       (i32.const 134208)
      )
      (get_local $6)
     )
     (set_local $3
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 4331664)
       )
      )
     )
     (set_local $2
      (i32.ne
       (get_local $5)
       (i32.const 9)
      )
     )
     (set_local $5
      (get_local $3)
     )
     (br_if $label$2
      (get_local $2)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $4
     (i32.add
      (get_local $4)
      (get_local $3)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $4)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.eqz
     (get_local $0)
    )
   )
   (set_local $2
    (i32.shl
     (get_local $0)
     (i32.const 1)
    )
   )
   (set_local $6
    (i32.const 0)
   )
   (set_local $5
    (i32.add
     (i32.add
      (i32.load offset=4331592
       (i32.const 0)
      )
      (tee_local $1
       (i32.load offset=1076
        (i32.const 0)
       )
      )
     )
     (i32.const 1)
    )
   )
   (loop $label$4
    (i32.store8
     (get_local $5)
     (tee_local $3
      (i32.and
       (get_local $6)
       (i32.const 15)
      )
     )
    )
    (i32.store8
     (i32.add
      (get_local $5)
      (i32.const -1)
     )
     (get_local $3)
    )
    (set_local $5
     (i32.add
      (get_local $5)
      (i32.const 2)
     )
    )
    (br_if $label$4
     (i32.ne
      (get_local $0)
      (tee_local $6
       (i32.add
        (get_local $6)
        (i32.const 1)
       )
      )
     )
    )
   )
   (i32.store offset=1076
    (i32.const 0)
    (i32.add
     (get_local $1)
     (get_local $2)
    )
   )
  )
  (block $label$5
   (br_if $label$5
    (i32.gt_u
     (get_local $4)
     (i32.const 2097150)
    )
   )
   (set_local $6
    (i32.const 10)
   )
   (set_local $5
    (i32.const 0)
   )
   (block $label$6
    (loop $label$7
     (i32.store8
      (i32.add
       (tee_local $2
        (i32.add
         (get_local $4)
         (get_local $5)
        )
       )
       (i32.const 134208)
      )
      (get_local $6)
     )
     (set_local $3
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br_if $label$6
      (i32.gt_u
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 4331680)
       )
      )
     )
     (set_local $2
      (i32.ne
       (get_local $5)
       (i32.const 13)
      )
     )
     (set_local $5
      (get_local $3)
     )
     (br_if $label$7
      (get_local $2)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $5
     (i32.add
      (get_local $4)
      (get_local $3)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $5)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z7isValid6CPoint (; 23 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $1
       (i32.load8_u
        (get_local $0)
       )
      )
     )
    )
    (br_if $label$0
     (i32.gt_u
      (i32.and
       (i32.add
        (get_local $1)
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 14)
     )
    )
    (return
     (i32.lt_u
      (i32.and
       (i32.add
        (i32.load8_u offset=1
         (get_local $0)
        )
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 15)
     )
    )
   )
   (return
    (i32.eqz
     (i32.load8_u offset=1
      (get_local $0)
     )
    )
   )
  )
  (i32.const 0)
 )
 (func $_Z10bit_is_oneij (; 24 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.ne
   (i32.and
    (get_local $1)
    (get_local $0)
   )
   (i32.const 0)
  )
 )
 (func $_Z7set_bitiRj (; 25 ;) (param $0 i32) (param $1 i32)
  (i32.store
   (get_local $1)
   (i32.or
    (i32.load
     (get_local $1)
    )
    (get_local $0)
   )
  )
 )
 (func $_Z9clear_bitiRj (; 26 ;) (param $0 i32) (param $1 i32)
  (i32.store
   (get_local $1)
   (i32.and
    (i32.load
     (get_local $1)
    )
    (i32.xor
     (get_local $0)
     (i32.const -1)
    )
   )
  )
 )
 (func $_Z12isValidPoint6CPoint (; 27 ;) (param $0 i32) (result i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (i32.load8_u
        (get_local $0)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (return
    (i32.lt_u
     (i32.and
      (i32.add
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 15)
    )
   )
  )
  (i32.const 0)
 )
 (func $_Z7isEmptyPc (; 28 ;) (param $0 i32) (result i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $0)
    )
   )
   (return
    (i32.eqz
     (i32.load8_u
      (get_local $0)
     )
    )
   )
  )
  (i32.const 1)
 )
 (func $_Z10PosToPointh (; 29 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (get_local $1)
     )
    )
    (set_local $2
     (i32.and
      (get_local $1)
      (i32.const 15)
     )
    )
    (set_local $1
     (i32.add
      (i32.shr_u
       (get_local $1)
       (i32.const 4)
      )
      (i32.const 1)
     )
    )
    (br $label$0)
   )
   (set_local $2
    (i32.const 0)
   )
   (set_local $1
    (i32.const 0)
   )
  )
  (i32.store8 offset=1
   (get_local $0)
   (get_local $1)
  )
  (i32.store8
   (get_local $0)
   (get_local $2)
  )
 )
 (func $_Z10PointToPos6CPoint (; 30 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $2
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $1
        (i32.load16_u align=1
         (get_local $0)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (i32.shr_u
        (get_local $1)
        (i32.const 8)
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $2
    (i32.add
     (i32.add
      (i32.shl
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.const 4)
      )
      (get_local $1)
     )
     (i32.const 240)
    )
   )
  )
  (i32.and
   (get_local $2)
   (i32.const 255)
  )
 )
 (func $_Z11newMoveNodev (; 31 ;) (result i32)
  (local $0 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $0
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.add
   (get_local $0)
   (i32.load offset=4331592
    (i32.const 0)
   )
  )
 )
 (func $_Z11newMoveNodeR8MoveNode (; 32 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $1
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.store16 align=1
   (tee_local $1
    (i32.add
     (get_local $1)
     (i32.load offset=4331592
      (i32.const 0)
     )
    )
   )
   (i32.load16_u align=1
    (get_local $0)
   )
  )
  (i32.store offset=4
   (get_local $1)
   (i32.load offset=4
    (get_local $0)
   )
  )
  (get_local $1)
 )
 (func $_Z11newMoveNode6CPoint (; 33 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $1
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.store16 align=1
   (tee_local $1
    (i32.add
     (get_local $1)
     (i32.load offset=4331592
      (i32.const 0)
     )
    )
   )
   (i32.load16_u align=1
    (get_local $0)
   )
  )
  (get_local $1)
 )
 (func $_Z16test_newMoveNodej (; 34 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $7
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $6
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $1
        (i32.add
         (get_local $6)
         (get_local $7)
        )
       )
       (i32.const 134208)
      )
      (get_local $2)
     )
     (set_local $3
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $2
      (i32.load8_u
       (i32.add
        (get_local $7)
        (i32.const 4331696)
       )
      )
     )
     (set_local $1
      (i32.ne
       (get_local $7)
       (i32.const 11)
      )
     )
     (set_local $7
      (get_local $3)
     )
     (br_if $label$2
      (get_local $1)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $6
     (i32.add
      (get_local $6)
      (get_local $3)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $6)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.eqz
     (get_local $0)
    )
   )
   (set_local $4
    (i32.const 0)
   )
   (loop $label$4
    (i32.store offset=1076
     (i32.const 0)
     (i32.add
      (tee_local $6
       (i32.load offset=1076
        (i32.const 0)
       )
      )
      (i32.const 24)
     )
    )
    (i32.store16 align=1
     (tee_local $7
      (i32.add
       (get_local $6)
       (i32.load offset=4331592
        (i32.const 0)
       )
      )
     )
     (i32.or
      (i32.shl
       (tee_local $6
        (i32.and
         (get_local $4)
         (i32.const 15)
        )
       )
       (i32.const 8)
      )
      (get_local $6)
     )
    )
    (i32.store offset=1076
     (i32.const 0)
     (i32.add
      (tee_local $6
       (i32.load offset=1076
        (i32.const 0)
       )
      )
      (i32.const 24)
     )
    )
    (i32.store16 align=1
     (tee_local $6
      (i32.add
       (get_local $6)
       (i32.load offset=4331592
        (i32.const 0)
       )
      )
     )
     (tee_local $2
      (i32.load16_u align=1
       (get_local $7)
      )
     )
    )
    (i32.store offset=4
     (get_local $6)
     (i32.load offset=4
      (get_local $7)
     )
    )
    (i32.store8 offset=4331648
     (i32.const 0)
     (tee_local $7
      (i32.load8_u
       (i32.add
        (i32.add
         (i32.load offset=4331628
          (i32.const 0)
         )
         (i32.and
          (get_local $2)
          (i32.const 255)
         )
        )
        (i32.const -1)
       )
      )
     )
    )
    (set_local $2
     (i32.load offset=4331644
      (i32.const 0)
     )
    )
    (block $label$5
     (block $label$6
      (br_if $label$6
       (i32.gt_u
        (tee_local $3
         (i32.load8_u offset=1
          (get_local $6)
         )
        )
        (i32.const 6)
       )
      )
      (i32.store8 offset=4331649
       (i32.const 0)
       (i32.load8_u offset=1
        (get_local $2)
       )
      )
      (set_local $3
       (i32.load8_u
        (i32.add
         (get_local $6)
         (i32.const 1)
        )
       )
      )
      (set_local $1
       (i32.const 4331651)
      )
      (set_local $5
       (i32.const 4331650)
      )
      (set_local $6
       (i32.const 6)
      )
      (br $label$5)
     )
     (set_local $1
      (i32.const 4331650)
     )
     (set_local $6
      (i32.const 16)
     )
     (set_local $5
      (i32.const 4331649)
     )
    )
    (set_local $6
     (i32.load8_u
      (i32.add
       (get_local $2)
       (i32.sub
        (get_local $6)
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
       )
      )
     )
    )
    (i32.store8
     (get_local $1)
     (i32.const 0)
    )
    (i32.store8
     (get_local $5)
     (get_local $6)
    )
    (block $label$7
     (block $label$8
      (br_if $label$8
       (i32.gt_u
        (tee_local $1
         (i32.load offset=1060
          (i32.const 0)
         )
        )
        (i32.const 2097150)
       )
      )
      (i32.store8
       (i32.add
        (get_local $1)
        (i32.const 134208)
       )
       (i32.const 10)
      )
      (block $label$9
       (br_if $label$9
        (i32.gt_u
         (tee_local $6
          (i32.add
           (get_local $1)
           (i32.const 1)
          )
         )
         (i32.const 2097150)
        )
       )
       (br_if $label$9
        (i32.eqz
         (i32.and
          (get_local $7)
          (i32.const 255)
         )
        )
       )
       (set_local $6
        (i32.const 0)
       )
       (block $label$10
        (loop $label$11
         (i32.store8
          (i32.add
           (tee_local $3
            (i32.add
             (get_local $1)
             (get_local $6)
            )
           )
           (i32.const 134209)
          )
          (get_local $7)
         )
         (set_local $2
          (i32.add
           (get_local $6)
           (i32.const 1)
          )
         )
         (br_if $label$10
          (i32.gt_u
           (i32.add
            (get_local $3)
            (i32.const 2)
           )
           (i32.const 2097150)
          )
         )
         (set_local $7
          (i32.add
           (get_local $6)
           (i32.const 4331649)
          )
         )
         (set_local $6
          (get_local $2)
         )
         (br_if $label$11
          (i32.and
           (tee_local $7
            (i32.load8_u
             (get_local $7)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
       (set_local $6
        (i32.add
         (i32.add
          (get_local $1)
          (get_local $2)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store offset=1060
       (i32.const 0)
       (get_local $6)
      )
      (i32.store8
       (i32.add
        (get_local $6)
        (i32.const 134208)
       )
       (i32.const 0)
      )
      (br $label$7)
     )
     (set_local $6
      (get_local $1)
     )
    )
    (br_if $label$4
     (i32.ne
      (tee_local $4
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
      )
      (get_local $0)
     )
    )
   )
  )
  (block $label$12
   (br_if $label$12
    (i32.gt_u
     (get_local $6)
     (i32.const 2097150)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (set_local $7
    (i32.const 0)
   )
   (block $label$13
    (loop $label$14
     (i32.store8
      (i32.add
       (tee_local $1
        (i32.add
         (get_local $6)
         (get_local $7)
        )
       )
       (i32.const 134208)
      )
      (get_local $2)
     )
     (set_local $3
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br_if $label$13
      (i32.gt_u
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $2
      (i32.load8_u
       (i32.add
        (get_local $7)
        (i32.const 4331712)
       )
      )
     )
     (set_local $1
      (i32.ne
       (get_local $7)
       (i32.const 15)
      )
     )
     (set_local $7
      (get_local $3)
     )
     (br_if $label$14
      (get_local $1)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $6
     (i32.add
      (get_local $6)
      (get_local $3)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $6)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z3msbh (; 35 ;) (param $0 i32) (result i32)
  (i32.and
   (get_local $0)
   (i32.const 128)
  )
 )
 (func $_Z8LessThan6CPointS_ (; 36 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $4
   (i32.const 0)
  )
  (set_local $3
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $0
        (i32.load16_u align=1
         (get_local $0)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $3
    (i32.const 0)
   )
   (br_if $label$0
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $2
        (i32.shr_u
         (get_local $0)
         (i32.const 8)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $3
    (i32.add
     (i32.add
      (i32.shl
       (get_local $2)
       (i32.const 4)
      )
      (get_local $0)
     )
     (i32.const 240)
    )
   )
  )
  (block $label$1
   (br_if $label$1
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $0
        (i32.load16_u align=1
         (get_local $1)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (br_if $label$1
    (i32.gt_u
     (i32.and
      (i32.add
       (tee_local $1
        (i32.shr_u
         (get_local $0)
         (i32.const 8)
        )
       )
       (i32.const -1)
      )
      (i32.const 255)
     )
     (i32.const 14)
    )
   )
   (set_local $4
    (i32.add
     (i32.add
      (i32.shl
       (get_local $1)
       (i32.const 4)
      )
      (get_local $0)
     )
     (i32.const 240)
    )
   )
  )
  (i32.lt_u
   (i32.and
    (get_local $3)
    (i32.const 255)
   )
   (i32.and
    (get_local $4)
    (i32.const 255)
   )
  )
 )
 (func $_Z14readOldCommentPc (; 37 ;) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store8
   (get_local $0)
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.lt_s
       (tee_local $0
        (i32.load
         (tee_local $1
          (i32.load offset=4331740
           (i32.const 0)
          )
         )
        )
       )
       (i32.load offset=4
        (get_local $1)
       )
      )
     )
     (block $label$3
      (br_if $label$3
       (tee_local $2
        (call $_Z9getBufferPhj
         (i32.const 3281984)
         (i32.const 1048576)
        )
       )
      )
      (set_local $2
       (i32.const 0)
      )
      (set_local $0
       (i32.const 0)
      )
      (br $label$1)
     )
     (set_local $0
      (i32.const 0)
     )
     (i32.store
      (get_local $1)
      (i32.const 0)
     )
     (i32.store
      (i32.add
       (get_local $1)
       (i32.const 4)
      )
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $0)
      (i32.const 1)
     )
    )
    (set_local $2
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 3281984)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $0)
      (i32.const 2)
     )
    )
    (set_local $0
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 3281985)
      )
     )
    )
   )
   (br_if $label$0
    (i32.gt_s
     (i32.shr_s
      (i32.shl
       (i32.or
        (get_local $2)
        (get_local $0)
       )
       (i32.const 24)
      )
      (i32.const 24)
     )
     (i32.const -1)
    )
   )
  )
 )
 (func $_Z14readNewCommentPc (; 38 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $2
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.lt_s
       (tee_local $3
        (i32.load
         (tee_local $1
          (i32.load offset=4331740
           (i32.const 0)
          )
         )
        )
       )
       (i32.load offset=4
        (get_local $1)
       )
      )
     )
     (block $label$3
      (br_if $label$3
       (tee_local $4
        (call $_Z9getBufferPhj
         (i32.const 3281984)
         (i32.const 1048576)
        )
       )
      )
      (set_local $4
       (i32.const 0)
      )
      (set_local $3
       (i32.const 0)
      )
      (br $label$1)
     )
     (set_local $3
      (i32.const 0)
     )
     (i32.store
      (get_local $1)
      (i32.const 0)
     )
     (i32.store
      (i32.add
       (get_local $1)
       (i32.const 4)
      )
      (i32.add
       (get_local $4)
       (i32.const -1)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (set_local $4
     (i32.load8_u
      (i32.add
       (get_local $3)
       (i32.const 3281984)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $3)
      (i32.const 2)
     )
    )
    (set_local $3
     (i32.load8_u
      (i32.add
       (get_local $3)
       (i32.const 3281985)
      )
     )
    )
   )
   (block $label$4
    (i32.store8
     (tee_local $1
      (i32.add
       (get_local $0)
       (get_local $2)
      )
     )
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
     (get_local $3)
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 2)
     )
    )
    (br_if $label$4
     (i32.eqz
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
     )
    )
    (br_if $label$0
     (i32.and
      (get_local $3)
      (i32.const 255)
     )
    )
   )
  )
  (get_local $2)
 )
 (func $_Z13readBoardTextPc (; 39 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $2
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.lt_s
       (tee_local $3
        (i32.load
         (tee_local $1
          (i32.load offset=4331740
           (i32.const 0)
          )
         )
        )
       )
       (i32.load offset=4
        (get_local $1)
       )
      )
     )
     (block $label$3
      (br_if $label$3
       (tee_local $4
        (call $_Z9getBufferPhj
         (i32.const 3281984)
         (i32.const 1048576)
        )
       )
      )
      (set_local $4
       (i32.const 0)
      )
      (set_local $3
       (i32.const 0)
      )
      (br $label$1)
     )
     (set_local $3
      (i32.const 0)
     )
     (i32.store
      (get_local $1)
      (i32.const 0)
     )
     (i32.store
      (i32.add
       (get_local $1)
       (i32.const 4)
      )
      (i32.add
       (get_local $4)
       (i32.const -1)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (set_local $4
     (i32.load8_u
      (i32.add
       (get_local $3)
       (i32.const 3281984)
      )
     )
    )
    (i32.store
     (get_local $1)
     (i32.add
      (get_local $3)
      (i32.const 2)
     )
    )
    (set_local $3
     (i32.load8_u
      (i32.add
       (get_local $3)
       (i32.const 3281985)
      )
     )
    )
   )
   (block $label$4
    (i32.store8
     (tee_local $1
      (i32.add
       (get_local $0)
       (get_local $2)
      )
     )
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
     (get_local $3)
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 2)
     )
    )
    (br_if $label$4
     (i32.eqz
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
     )
    )
    (br_if $label$0
     (i32.and
      (get_local $3)
      (i32.const 255)
     )
    )
   )
  )
  (get_local $2)
 )
 (func $_Z7addMoveP8MoveNodeS0_ (; 40 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $7
   (i32.add
    (get_local $0)
    (i32.const 16)
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $0
      (i32.load offset=16
       (get_local $0)
      )
     )
    )
   )
   (set_local $3
    (i32.load16_u align=1
     (get_local $0)
    )
   )
   (set_local $6
    (i32.const 0)
   )
   (set_local $5
    (i32.const 0)
   )
   (block $label$1
    (br_if $label$1
     (i32.gt_u
      (i32.and
       (i32.add
        (tee_local $2
         (i32.load16_u align=1
          (get_local $1)
         )
        )
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 14)
     )
    )
    (set_local $5
     (i32.const 0)
    )
    (br_if $label$1
     (i32.gt_u
      (i32.and
       (i32.add
        (tee_local $4
         (i32.shr_u
          (get_local $2)
          (i32.const 8)
         )
        )
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 14)
     )
    )
    (set_local $5
     (i32.add
      (i32.add
       (i32.shl
        (get_local $4)
        (i32.const 4)
       )
       (get_local $2)
      )
      (i32.const 240)
     )
    )
   )
   (block $label$2
    (br_if $label$2
     (i32.gt_u
      (i32.and
       (i32.add
        (get_local $3)
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 14)
     )
    )
    (br_if $label$2
     (i32.gt_u
      (i32.and
       (i32.add
        (tee_local $2
         (i32.shr_u
          (get_local $3)
          (i32.const 8)
         )
        )
        (i32.const -1)
       )
       (i32.const 255)
      )
      (i32.const 14)
     )
    )
    (set_local $6
     (i32.add
      (i32.add
       (i32.shl
        (get_local $2)
        (i32.const 4)
       )
       (get_local $3)
      )
      (i32.const 240)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ge_u
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
      (i32.and
       (get_local $6)
       (i32.const 255)
      )
     )
    )
    (i32.store
     (i32.add
      (get_local $1)
      (i32.const 20)
     )
     (get_local $0)
    )
    (i32.store
     (get_local $7)
     (get_local $1)
    )
    (return)
   )
   (loop $label$4
    (set_local $7
     (i32.add
      (get_local $0)
      (i32.const 20)
     )
    )
    (br_if $label$0
     (i32.eqz
      (tee_local $0
       (i32.load offset=20
        (get_local $0)
       )
      )
     )
    )
    (set_local $3
     (i32.load16_u align=1
      (get_local $0)
     )
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $5
     (i32.const 0)
    )
    (block $label$5
     (br_if $label$5
      (i32.gt_u
       (i32.and
        (i32.add
         (tee_local $2
          (i32.load16_u align=1
           (get_local $1)
          )
         )
         (i32.const -1)
        )
        (i32.const 255)
       )
       (i32.const 14)
      )
     )
     (set_local $5
      (i32.const 0)
     )
     (br_if $label$5
      (i32.gt_u
       (i32.and
        (i32.add
         (tee_local $4
          (i32.shr_u
           (get_local $2)
           (i32.const 8)
          )
         )
         (i32.const -1)
        )
        (i32.const 255)
       )
       (i32.const 14)
      )
     )
     (set_local $5
      (i32.add
       (i32.add
        (i32.shl
         (get_local $4)
         (i32.const 4)
        )
        (get_local $2)
       )
       (i32.const 240)
      )
     )
    )
    (block $label$6
     (br_if $label$6
      (i32.gt_u
       (i32.and
        (i32.add
         (get_local $3)
         (i32.const -1)
        )
        (i32.const 255)
       )
       (i32.const 14)
      )
     )
     (br_if $label$6
      (i32.gt_u
       (i32.and
        (i32.add
         (tee_local $2
          (i32.shr_u
           (get_local $3)
           (i32.const 8)
          )
         )
         (i32.const -1)
        )
        (i32.const 255)
       )
       (i32.const 14)
      )
     )
     (set_local $6
      (i32.add
       (i32.add
        (i32.shl
         (get_local $2)
         (i32.const 4)
        )
        (get_local $3)
       )
       (i32.const 240)
      )
     )
    )
    (br_if $label$4
     (i32.ge_u
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
      (i32.and
       (get_local $6)
       (i32.const 255)
      )
     )
    )
   )
   (i32.store
    (i32.add
     (get_local $1)
     (i32.const 20)
    )
    (get_local $0)
   )
  )
  (i32.store
   (get_local $7)
   (get_local $1)
  )
 )
 (func $_Z13addAttributesP8MoveNodeS0_RbS1_S1_ (; 41 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store8
   (get_local $2)
   (i32.const 0)
  )
  (i32.store8
   (get_local $3)
   (i32.const 0)
  )
  (i32.store8
   (get_local $4)
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (i32.and
      (tee_local $6
       (i32.load offset=4
        (get_local $1)
       )
      )
      (i32.const 16)
     )
    )
   )
   (br_if $label$0
    (i32.and
     (tee_local $5
      (i32.load offset=4
       (get_local $0)
      )
     )
     (i32.const 16)
    )
   )
   (i32.store
    (i32.add
     (get_local $0)
     (i32.const 4)
    )
    (i32.or
     (get_local $5)
     (i32.const 16)
    )
   )
   (i32.store8
    (get_local $2)
    (i32.const 1)
   )
   (set_local $6
    (i32.load
     (i32.add
      (get_local $1)
      (i32.const 4)
     )
    )
   )
  )
  (block $label$1
   (br_if $label$1
    (i32.and
     (get_local $6)
     (i32.const 2)
    )
   )
   (br_if $label$1
    (i32.eqz
     (i32.and
      (tee_local $2
       (i32.load offset=4
        (get_local $0)
       )
      )
      (i32.const 2)
     )
    )
   )
   (i32.store
    (i32.add
     (get_local $0)
     (i32.const 4)
    )
    (i32.and
     (get_local $2)
     (i32.const -3)
    )
   )
   (i32.store8
    (get_local $3)
    (i32.const 1)
   )
   (set_local $6
    (i32.load
     (i32.add
      (get_local $1)
      (i32.const 4)
     )
    )
   )
  )
  (block $label$2
   (br_if $label$2
    (i32.eqz
     (i32.and
      (get_local $6)
      (i32.const 4)
     )
    )
   )
   (br_if $label$2
    (i32.and
     (tee_local $6
      (i32.load offset=4
       (get_local $0)
      )
     )
     (i32.const 4)
    )
   )
   (i32.store8
    (get_local $4)
    (i32.const 1)
   )
   (i32.store
    (i32.add
     (get_local $0)
     (i32.const 4)
    )
    (i32.or
     (get_local $6)
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z10getVariantP8MoveNode6CPoint (; 42 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $0
       (i32.load offset=16
        (get_local $0)
       )
      )
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.ne
       (i32.load8_u
        (get_local $0)
       )
       (tee_local $2
        (i32.load8_u
         (get_local $1)
        )
       )
      )
     )
     (br_if $label$2
      (i32.ne
       (i32.load8_u offset=1
        (get_local $0)
       )
       (i32.load8_u offset=1
        (get_local $1)
       )
      )
     )
     (return
      (get_local $0)
     )
    )
    (br_if $label$1
     (i32.eqz
      (tee_local $0
       (i32.load offset=20
        (get_local $0)
       )
      )
     )
    )
    (set_local $1
     (i32.and
      (i32.load8_u offset=1
       (get_local $1)
      )
      (i32.const 255)
     )
    )
    (loop $label$3
     (block $label$4
      (br_if $label$4
       (i32.ne
        (i32.load8_u
         (get_local $0)
        )
        (get_local $2)
       )
      )
      (br_if $label$0
       (i32.eq
        (i32.load8_u offset=1
         (get_local $0)
        )
        (get_local $1)
       )
      )
     )
     (br_if $label$3
      (tee_local $0
       (i32.load offset=20
        (get_local $0)
       )
      )
     )
    )
   )
   (return
    (i32.const 0)
   )
  )
  (get_local $0)
 )
 (func $_Z11getAutoMovev (; 43 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (set_local $2
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $1
      (i32.load offset=16
       (i32.load offset=4331728
        (i32.const 0)
       )
      )
     )
    )
   )
   (set_local $2
    (i32.const 0)
   )
   (set_local $0
    (i32.const 1088)
   )
   (loop $label$1
    (br_if $label$0
     (i32.load offset=20
      (get_local $1)
     )
    )
    (i32.store16
     (get_local $0)
     (i32.load16_u align=1
      (get_local $1)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 2)
     )
    )
    (set_local $2
     (i32.add
      (get_local $2)
      (i32.const 1)
     )
    )
    (br_if $label$1
     (tee_local $1
      (i32.load offset=16
       (get_local $1)
      )
     )
    )
   )
  )
  (get_local $2)
 )
 (func $_Z15test_getVariantv (; 44 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $6
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.store16 align=1
   (tee_local $2
    (i32.add
     (get_local $6)
     (i32.load offset=4331592
      (i32.const 0)
     )
    )
   )
   (i32.const 1799)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $6
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.store16 align=1
   (tee_local $0
    (i32.add
     (get_local $6)
     (i32.load offset=4331592
      (i32.const 0)
     )
    )
   )
   (i32.const 2056)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $5
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $4
    (i32.const 10)
   )
   (set_local $6
    (i32.const 0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $3
        (i32.add
         (get_local $5)
         (get_local $6)
        )
       )
       (i32.const 134208)
      )
      (get_local $4)
     )
     (set_local $1
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $3)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 4331744)
       )
      )
     )
     (set_local $3
      (i32.ne
       (get_local $6)
       (i32.const 20)
      )
     )
     (set_local $6
      (get_local $1)
     )
     (br_if $label$2
      (get_local $3)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $5
     (i32.add
      (get_local $5)
      (get_local $1)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $5)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (i32.store offset=904
   (tee_local $6
    (i32.load offset=4331736
     (i32.const 0)
    )
   )
   (tee_local $4
    (i32.add
     (i32.load offset=904
      (get_local $6)
     )
     (i32.const 1)
    )
   )
  )
  (i32.store
   (i32.add
    (get_local $6)
    (i32.shl
     (get_local $4)
     (i32.const 2)
    )
   )
   (get_local $2)
  )
  (block $label$3
   (br_if $label$3
    (i32.gt_u
     (get_local $5)
     (i32.const 2097150)
    )
   )
   (set_local $4
    (i32.const 10)
   )
   (set_local $6
    (i32.const 0)
   )
   (block $label$4
    (loop $label$5
     (i32.store8
      (i32.add
       (tee_local $3
        (i32.add
         (get_local $5)
         (get_local $6)
        )
       )
       (i32.const 134208)
      )
      (get_local $4)
     )
     (set_local $1
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$4
      (i32.gt_u
       (i32.add
        (get_local $3)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 4331776)
       )
      )
     )
     (set_local $3
      (i32.ne
       (get_local $6)
       (i32.const 16)
      )
     )
     (set_local $6
      (get_local $1)
     )
     (br_if $label$5
      (get_local $3)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $5
     (i32.add
      (get_local $5)
      (get_local $1)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $5)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (set_local $6
   (i32.const 0)
  )
  (i32.store offset=904
   (tee_local $4
    (i32.load offset=4331736
     (i32.const 0)
    )
   )
   (tee_local $1
    (i32.add
     (i32.load offset=904
      (get_local $4)
     )
     (i32.const 1)
    )
   )
  )
  (i32.store
   (i32.add
    (get_local $4)
    (i32.shl
     (get_local $1)
     (i32.const 2)
    )
   )
   (get_local $0)
  )
  (block $label$6
   (br_if $label$6
    (i32.gt_u
     (get_local $5)
     (i32.const 2097150)
    )
   )
   (set_local $4
    (i32.const 10)
   )
   (block $label$7
    (loop $label$8
     (i32.store8
      (i32.add
       (tee_local $3
        (i32.add
         (get_local $5)
         (get_local $6)
        )
       )
       (i32.const 134208)
      )
      (get_local $4)
     )
     (set_local $1
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$7
      (i32.gt_u
       (tee_local $2
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (i32.const 2097150)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 4331808)
       )
      )
     )
     (set_local $3
      (i32.ne
       (get_local $6)
       (i32.const 12)
      )
     )
     (set_local $6
      (get_local $1)
     )
     (br_if $label$8
      (get_local $3)
     )
    )
   )
   (set_local $6
    (i32.const 0)
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $3
     (i32.add
      (get_local $5)
      (get_local $1)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $3)
     (i32.const 134208)
    )
    (i32.const 0)
   )
   (br_if $label$6
    (i32.gt_u
     (get_local $2)
     (i32.const 2097150)
    )
   )
   (set_local $5
    (i32.const 10)
   )
   (block $label$9
    (loop $label$10
     (i32.store8
      (i32.add
       (tee_local $1
        (i32.add
         (get_local $3)
         (get_local $6)
        )
       )
       (i32.const 134208)
      )
      (get_local $5)
     )
     (set_local $4
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$9
      (i32.gt_u
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 4331824)
       )
      )
     )
     (set_local $1
      (i32.ne
       (get_local $6)
       (i32.const 20)
      )
     )
     (set_local $6
      (get_local $4)
     )
     (br_if $label$10
      (get_local $1)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $6
     (i32.add
      (get_local $3)
      (get_local $4)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $6)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (i32.const 1)
 )
 (func $_Z8findNodeRP8MoveNode6CPoint (; 45 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $3
      (i32.load
       (get_local $0)
      )
     )
    )
   )
   (set_local $2
    (i32.and
     (i32.load8_u
      (get_local $1)
     )
     (i32.const 255)
    )
   )
   (set_local $1
    (i32.and
     (i32.load8_u offset=1
      (get_local $1)
     )
     (i32.const 255)
    )
   )
   (loop $label$1
    (block $label$2
     (br_if $label$2
      (i32.ne
       (i32.load8_u
        (get_local $3)
       )
       (get_local $2)
      )
     )
     (br_if $label$0
      (i32.eq
       (i32.load8_u offset=1
        (get_local $3)
       )
       (get_local $1)
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i32.eqz
       (tee_local $3
        (i32.load offset=20
         (get_local $3)
        )
       )
      )
     )
     (i32.store
      (get_local $0)
      (get_local $3)
     )
     (br $label$1)
    )
   )
   (i32.store
    (get_local $0)
    (i32.const 0)
   )
  )
 )
 (func $_Z19searchInnerHTMLInfoP6CPointj (; 46 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store offset=1092
   (i32.const 0)
   (i32.const -1)
  )
  (i32.store offset=1088
   (i32.const 0)
   (i32.load offset=8
    (tee_local $6
     (i32.load offset=4331728
      (i32.const 0)
     )
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $1)
    )
   )
   (set_local $2
    (i32.add
     (get_local $1)
     (i32.const -1)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (loop $label$1
    (br_if $label$0
     (i32.eqz
      (tee_local $6
       (i32.load offset=16
        (get_local $6)
       )
      )
     )
    )
    (set_local $4
     (i32.shr_u
      (tee_local $3
       (i32.load16_u
        (i32.add
         (i32.shl
          (get_local $5)
          (i32.const 1)
         )
         (i32.const 67648)
        )
       )
      )
      (i32.const 8)
     )
    )
    (block $label$2
     (loop $label$3
      (block $label$4
       (br_if $label$4
        (i32.ne
         (i32.load8_u
          (get_local $6)
         )
         (i32.and
          (get_local $3)
          (i32.const 255)
         )
        )
       )
       (br_if $label$2
        (i32.eq
         (i32.load8_u offset=1
          (get_local $6)
         )
         (get_local $4)
        )
       )
      )
      (br_if $label$3
       (tee_local $6
        (i32.load offset=20
         (get_local $6)
        )
       )
      )
      (br $label$0)
     )
    )
    (block $label$5
     (br_if $label$5
      (i32.ne
       (get_local $5)
       (get_local $2)
      )
     )
     (br_if $label$5
      (i32.eqz
       (tee_local $3
        (i32.load offset=8
         (get_local $6)
        )
       )
      )
     )
     (i32.store offset=1092
      (i32.const 0)
      (get_local $2)
     )
     (i32.store offset=1088
      (i32.const 0)
      (get_local $3)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $5
       (i32.add
        (get_local $5)
        (i32.const 1)
       )
      )
      (get_local $1)
     )
    )
   )
  )
 )
 (func $_Z7indexOf6CPointPS_i (; 47 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (set_local $3
     (i32.and
      (i32.load8_u
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (set_local $0
     (i32.and
      (i32.load8_u offset=1
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (loop $label$2
     (block $label$3
      (br_if $label$3
       (i32.ne
        (i32.load8_u
         (get_local $1)
        )
        (get_local $3)
       )
      )
      (br_if $label$0
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
        (get_local $0)
       )
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 2)
      )
     )
     (br_if $label$2
      (i32.lt_s
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (get_local $2)
      )
     )
    )
   )
   (return
    (i32.const -1)
   )
  )
  (get_local $4)
 )
 (func $_Z11indexOfNode6CPointP4Nodei (; 48 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $4
     (i32.const 0)
    )
    (set_local $3
     (i32.and
      (i32.load8_u
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (set_local $0
     (i32.and
      (i32.load8_u offset=1
       (get_local $0)
      )
      (i32.const 255)
     )
    )
    (loop $label$2
     (block $label$3
      (br_if $label$3
       (i32.ne
        (i32.load8_u
         (get_local $1)
        )
        (get_local $3)
       )
      )
      (br_if $label$0
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $1)
          (i32.const 1)
         )
        )
        (get_local $0)
       )
      )
     )
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 12)
      )
     )
     (br_if $label$2
      (i32.lt_s
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (get_local $2)
      )
     )
    )
   )
   (return
    (i32.const -1)
   )
  )
  (get_local $4)
 )
 (func $_Z14getBranchNodesP6CPointi (; 49 ;) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (i32.store offset=1088
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $2
   (i32.rem_s
    (i32.add
     (get_local $1)
     (i32.const 1)
    )
    (i32.const 2)
   )
  )
  (set_local $9
   (i32.const 1092)
  )
  (set_local $8
   (i32.const 0)
  )
  (set_local $15
   (tee_local $5
    (i32.load offset=16
     (i32.load offset=4331728
      (i32.const 0)
     )
    )
   )
  )
  (set_local $10
   (i32.const 0)
  )
  (set_local $11
   (i32.const 0)
  )
  (set_local $12
   (i32.const 0)
  )
  (set_local $13
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (get_local $15)
   )
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (block $label$7
          (block $label$8
           (br_if $label$8
            (i32.eqz
             (tee_local $3
              (get_local $5)
             )
            )
           )
           (set_local $7
            (i32.const -1)
           )
           (br_if $label$6
            (i32.lt_s
             (get_local $1)
             (i32.const 1)
            )
           )
           (set_local $6
            (i32.shr_u
             (tee_local $5
              (i32.load16_u align=1
               (get_local $4)
              )
             )
             (i32.const 8)
            )
           )
           (set_local $15
            (i32.const 0)
           )
           (set_local $14
            (get_local $0)
           )
           (loop $label$9
            (block $label$10
             (br_if $label$10
              (i32.ne
               (i32.load8_u
                (get_local $14)
               )
               (i32.and
                (get_local $5)
                (i32.const 255)
               )
              )
             )
             (br_if $label$7
              (i32.eq
               (i32.load8_u
                (i32.add
                 (get_local $14)
                 (i32.const 1)
                )
               )
               (get_local $6)
              )
             )
            )
            (set_local $14
             (i32.add
              (get_local $14)
              (i32.const 2)
             )
            )
            (br_if $label$9
             (i32.lt_s
              (tee_local $15
               (i32.add
                (get_local $15)
                (i32.const 1)
               )
              )
              (get_local $1)
             )
            )
            (br $label$6)
           )
          )
          (br_if $label$5
           (i32.lt_s
            (get_local $12)
            (i32.const 1)
           )
          )
          (set_local $10
           (select
            (get_local $10)
            (i32.const 0)
            (tee_local $5
             (i32.or
              (i32.eqz
               (get_local $11)
              )
              (i32.lt_s
               (get_local $10)
               (tee_local $15
                (i32.load
                 (i32.add
                  (tee_local $14
                   (i32.shl
                    (tee_local $12
                     (i32.add
                      (get_local $12)
                      (i32.const -1)
                     )
                    )
                    (i32.const 3)
                   )
                  )
                  (i32.const 69696)
                 )
                )
               )
              )
             )
            )
           )
          )
          (set_local $11
           (select
            (get_local $11)
            (i32.const 0)
            (get_local $5)
           )
          )
          (set_local $13
           (i32.add
            (get_local $15)
            (i32.const -1)
           )
          )
          (set_local $15
           (tee_local $5
            (i32.load
             (i32.add
              (get_local $14)
              (i32.const 69700)
             )
            )
           )
          )
          (br $label$0)
         )
         (set_local $7
          (get_local $15)
         )
        )
        (i32.store
         (i32.add
          (i32.shl
           (get_local $13)
           (i32.const 2)
          )
          (i32.const 68672)
         )
         (get_local $4)
        )
        (set_local $6
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
        (block $label$11
         (br_if $label$11
          (i32.eqz
           (tee_local $14
            (i32.load offset=20
             (get_local $3)
            )
           )
          )
         )
         (i32.store
          (i32.add
           (tee_local $15
            (i32.shl
             (get_local $12)
             (i32.const 3)
            )
           )
           (i32.const 69696)
          )
          (get_local $6)
         )
         (i32.store
          (i32.add
           (get_local $15)
           (i32.const 69700)
          )
          (get_local $14)
         )
         (set_local $12
          (i32.add
           (get_local $12)
           (i32.const 1)
          )
         )
        )
        (block $label$12
         (br_if $label$12
          (i32.ge_s
           (get_local $13)
           (get_local $1)
          )
         )
         (block $label$13
          (br_if $label$13
           (i32.ge_s
            (get_local $7)
            (i32.const 0)
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $15
           (i32.const 0)
          )
          (set_local $13
           (get_local $6)
          )
          (br_if $label$0
           (get_local $11)
          )
          (set_local $15
           (i32.const 0)
          )
          (set_local $13
           (get_local $6)
          )
          (br_if $label$0
           (i32.ne
            (get_local $7)
            (i32.const -1)
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $15
           (i32.const 0)
          )
          (set_local $11
           (i32.const 0)
          )
          (set_local $13
           (get_local $6)
          )
          (br_if $label$0
           (i32.ne
            (i32.rem_s
             (get_local $6)
             (i32.const 2)
            )
            (get_local $2)
           )
          )
          (set_local $15
           (tee_local $5
            (i32.load offset=16
             (get_local $3)
            )
           )
          )
          (set_local $10
           (get_local $6)
          )
          (set_local $11
           (get_local $3)
          )
          (set_local $13
           (get_local $6)
          )
          (br $label$0)
         )
         (set_local $14
          (i32.rem_s
           (get_local $13)
           (i32.const 2)
          )
         )
         (set_local $5
          (i32.const 0)
         )
         (set_local $15
          (i32.const 0)
         )
         (set_local $13
          (get_local $6)
         )
         (br_if $label$0
          (i32.ne
           (get_local $14)
           (i32.and
            (get_local $7)
            (i32.const 1)
           )
          )
         )
         (set_local $15
          (tee_local $5
           (i32.load offset=16
            (get_local $3)
           )
          )
         )
         (set_local $13
          (get_local $6)
         )
         (br $label$0)
        )
        (set_local $14
         (i32.ne
          (get_local $13)
          (get_local $1)
         )
        )
        (set_local $5
         (get_local $3)
        )
        (set_local $15
         (get_local $4)
        )
        (set_local $13
         (get_local $6)
        )
        (br_if $label$0
         (get_local $14)
        )
        (block $label$14
         (br_if $label$14
          (i32.ge_s
           (get_local $7)
           (i32.const 0)
          )
         )
         (set_local $5
          (i32.const 0)
         )
         (set_local $15
          (i32.const 0)
         )
         (set_local $13
          (get_local $6)
         )
         (br_if $label$0
          (get_local $11)
         )
         (set_local $15
          (i32.const 0)
         )
         (set_local $13
          (get_local $6)
         )
         (br_if $label$0
          (i32.ne
           (get_local $7)
           (i32.const -1)
          )
         )
         (set_local $5
          (i32.load16_u align=1
           (get_local $4)
          )
         )
         (block $label$15
          (block $label$16
           (block $label$17
            (br_if $label$17
             (i32.lt_s
              (get_local $8)
              (i32.const 1)
             )
            )
            (set_local $13
             (i32.shr_u
              (get_local $5)
              (i32.const 8)
             )
            )
            (set_local $15
             (i32.const 0)
            )
            (set_local $14
             (i32.const 1100)
            )
            (block $label$18
             (loop $label$19
              (block $label$20
               (br_if $label$20
                (i32.ne
                 (i32.load8_u
                  (i32.add
                   (get_local $14)
                   (i32.const -8)
                  )
                 )
                 (i32.and
                  (get_local $5)
                  (i32.const 255)
                 )
                )
               )
               (br_if $label$18
                (i32.eq
                 (i32.load8_u
                  (i32.add
                   (get_local $14)
                   (i32.const -7)
                  )
                 )
                 (get_local $13)
                )
               )
              )
              (set_local $14
               (i32.add
                (get_local $14)
                (i32.const 12)
               )
              )
              (br_if $label$19
               (i32.lt_s
                (tee_local $15
                 (i32.add
                  (get_local $15)
                  (i32.const 1)
                 )
                )
                (get_local $8)
               )
              )
              (br $label$17)
             )
            )
            (br_if $label$16
             (i32.ge_s
              (get_local $15)
              (i32.const 0)
             )
            )
           )
           (i32.store16 align=1
            (get_local $9)
            (get_local $5)
           )
           (set_local $5
            (i32.const 0)
           )
           (i32.store offset=8
            (get_local $9)
            (i32.const 0)
           )
           (i32.store offset=4
            (get_local $9)
            (i32.load offset=12
             (get_local $3)
            )
           )
           (i32.store offset=1088
            (i32.const 0)
            (tee_local $8
             (i32.add
              (i32.load offset=1088
               (i32.const 0)
              )
              (i32.const 1)
             )
            )
           )
           (set_local $9
            (i32.add
             (get_local $9)
             (i32.const 12)
            )
           )
           (br $label$15)
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $15
           (i32.const 0)
          )
          (set_local $11
           (i32.const 0)
          )
          (set_local $13
           (get_local $6)
          )
          (br_if $label$0
           (i32.load
            (tee_local $4
             (i32.add
              (get_local $14)
              (i32.const -4)
             )
            )
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (i32.store
           (get_local $14)
           (i32.const 0)
          )
          (i32.store
           (get_local $4)
           (i32.load offset=12
            (get_local $3)
           )
          )
         )
         (set_local $15
          (i32.const 0)
         )
         (set_local $11
          (i32.const 0)
         )
         (set_local $13
          (get_local $6)
         )
         (br $label$0)
        )
        (set_local $5
         (i32.load16_u align=1
          (get_local $11)
         )
        )
        (br_if $label$3
         (i32.lt_s
          (get_local $8)
          (i32.const 1)
         )
        )
        (set_local $13
         (i32.shr_u
          (get_local $5)
          (i32.const 8)
         )
        )
        (set_local $15
         (i32.const 0)
        )
        (set_local $14
         (i32.const 1100)
        )
        (loop $label$21
         (block $label$22
          (br_if $label$22
           (i32.ne
            (i32.load8_u
             (i32.add
              (get_local $14)
              (i32.const -8)
             )
            )
            (i32.and
             (get_local $5)
             (i32.const 255)
            )
           )
          )
          (br_if $label$4
           (i32.eq
            (i32.load8_u
             (i32.add
              (get_local $14)
              (i32.const -7)
             )
            )
            (get_local $13)
           )
          )
         )
         (set_local $14
          (i32.add
           (get_local $14)
           (i32.const 12)
          )
         )
         (br_if $label$21
          (i32.lt_s
           (tee_local $15
            (i32.add
             (get_local $15)
             (i32.const 1)
            )
           )
           (get_local $8)
          )
         )
         (br $label$3)
        )
       )
       (return)
      )
      (br_if $label$2
       (i32.ge_s
        (get_local $15)
        (i32.const 0)
       )
      )
     )
     (i32.store16 align=1
      (get_local $9)
      (get_local $5)
     )
     (set_local $5
      (i32.const 0)
     )
     (i32.store offset=8
      (get_local $9)
      (i32.const 0)
     )
     (i32.store offset=4
      (get_local $9)
      (i32.load offset=12
       (get_local $3)
      )
     )
     (i32.store offset=1088
      (i32.const 0)
      (tee_local $8
       (i32.add
        (i32.load offset=1088
         (i32.const 0)
        )
        (i32.const 1)
       )
      )
     )
     (set_local $9
      (i32.add
       (get_local $9)
       (i32.const 12)
      )
     )
     (br $label$1)
    )
    (set_local $5
     (i32.const 0)
    )
    (set_local $15
     (i32.const 0)
    )
    (set_local $13
     (get_local $6)
    )
    (br_if $label$0
     (i32.load
      (tee_local $4
       (i32.add
        (get_local $14)
        (i32.const -4)
       )
      )
     )
    )
    (set_local $5
     (i32.const 0)
    )
    (i32.store
     (get_local $14)
     (i32.const 0)
    )
    (i32.store
     (get_local $4)
     (i32.load offset=12
      (get_local $3)
     )
    )
   )
   (set_local $15
    (i32.const 0)
   )
   (set_local $13
    (get_local $6)
   )
   (br $label$0)
  )
 )
 (func $_Z22getMoveNodeCountBufferv (; 50 ;) (result i32)
  (i32.const 4331848)
 )
 (func $_Z12checkVersionv (; 51 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $7
   (i32.const 0)
  )
  (set_local $0
   (i32.load offset=4331740
    (i32.const 0)
   )
  )
  (set_local $1
   (call $_Z9getBufferPhj
    (i32.const 3281984)
    (i32.const 20)
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $2
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $6
    (i32.const 10)
   )
   (set_local $5
    (i32.const 0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $4
        (i32.add
         (get_local $2)
         (get_local $5)
        )
       )
       (i32.const 134208)
      )
      (get_local $6)
     )
     (set_local $3
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 4331920)
       )
      )
     )
     (set_local $4
      (i32.ne
       (get_local $5)
       (i32.const 13)
      )
     )
     (set_local $5
      (get_local $3)
     )
     (br_if $label$2
      (get_local $4)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $5
     (i32.add
      (get_local $2)
      (get_local $3)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $5)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (block $label$3
   (br_if $label$3
    (i32.ne
     (get_local $1)
     (i32.const 20)
    )
   )
   (set_local $5
    (i32.const 0)
   )
   (set_local $6
    (i32.const 1)
   )
   (block $label$4
    (loop $label$5
     (set_local $6
      (i32.and
       (get_local $6)
       (tee_local $3
        (i32.eq
         (i32.load8_u
          (i32.add
           (get_local $5)
           (i32.const 3281984)
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $5)
           (i32.const 4331888)
          )
         )
        )
       )
      )
     )
     (br_if $label$4
      (i32.gt_s
       (get_local $5)
       (i32.const 6)
      )
     )
     (set_local $5
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br_if $label$5
      (get_local $3)
     )
    )
   )
   (block $label$6
    (block $label$7
     (br_if $label$7
      (i32.eqz
       (get_local $6)
      )
     )
     (set_local $7
      (i32.const 0)
     )
     (i32.store8 offset=12
      (get_local $0)
      (tee_local $5
       (i32.load8_u offset=3281992
        (i32.const 0)
       )
      )
     )
     (i32.store8 offset=13
      (get_local $0)
      (tee_local $6
       (i32.load8_u offset=3281993
        (i32.const 0)
       )
      )
     )
     (br_if $label$6
      (i32.le_u
       (i32.add
        (get_local $6)
        (i32.mul
         (get_local $5)
         (i32.const 100)
        )
       )
       (i32.const 304)
      )
     )
     (br $label$3)
    )
    (set_local $7
     (i32.const 0)
    )
    (br_if $label$3
     (i32.ne
      (i32.load8_u offset=3281984
       (i32.const 0)
      )
      (i32.const 120)
     )
    )
   )
   (i32.store offset=904
    (tee_local $5
     (call $memset
      (i32.load offset=4331736
       (i32.const 0)
      )
      (i32.const 0)
      (i32.const 904)
     )
    )
    (i32.const -1)
   )
   (drop
    (call $memset
     (i32.load offset=4331732
      (i32.const 0)
     )
     (i32.const 0)
     (i32.const 1804)
    )
   )
   (block $label$8
    (block $label$9
     (br_if $label$9
      (i32.eq
       (i32.load offset=904
        (get_local $5)
       )
       (i32.const -1)
      )
     )
     (i32.store
      (i32.add
       (get_local $5)
       (i32.const 904)
      )
      (i32.const 0)
     )
     (set_local $6
      (i32.load
       (get_local $5)
      )
     )
     (br $label$8)
    )
    (i32.store offset=1076
     (i32.const 0)
     (i32.add
      (tee_local $6
       (i32.load offset=1076
        (i32.const 0)
       )
      )
      (i32.const 24)
     )
    )
    (i32.store
     (get_local $5)
     (tee_local $6
      (i32.add
       (i32.add
        (get_local $6)
        (i32.load offset=4331592
         (i32.const 0)
        )
       )
       (i32.const 24)
      )
     )
    )
    (i32.store
     (i32.add
      (get_local $5)
      (i32.const 904)
     )
     (i32.const 0)
    )
   )
   (i32.store offset=4331728
    (i32.const 0)
    (get_local $6)
   )
   (return
    (i32.const 1)
   )
  )
  (get_local $7)
 )
 (func $_Z15loadAllMoveNodev (; 52 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $3
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.store offset=4331848
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $0
   (call $_ZN11LibraryFile3GetER8MoveNode
    (i32.load offset=4331740
     (i32.const 0)
    )
    (tee_local $2
     (i32.add
      (get_local $3)
      (i32.load offset=4331592
       (i32.const 0)
      )
     )
    )
   )
  )
  (set_local $3
   (i32.load offset=4331848
    (i32.const 0)
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $0)
    )
   )
   (loop $label$1
    (i32.store offset=4331848
     (i32.const 0)
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (i32.and
        (tee_local $3
         (i32.load offset=4
          (get_local $2)
         )
        )
        (i32.const 32)
       )
      )
     )
     (i32.store8 offset=67648
      (i32.const 0)
      (i32.const 0)
     )
     (loop $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.lt_s
          (tee_local $3
           (i32.load
            (tee_local $0
             (i32.load offset=4331740
              (i32.const 0)
             )
            )
           )
          )
          (i32.load offset=4
           (get_local $0)
          )
         )
        )
        (block $label$6
         (br_if $label$6
          (tee_local $5
           (call $_Z9getBufferPhj
            (i32.const 3281984)
            (i32.const 1048576)
           )
          )
         )
         (set_local $5
          (i32.const 0)
         )
         (set_local $3
          (i32.const 0)
         )
         (br $label$4)
        )
        (set_local $3
         (i32.const 0)
        )
        (i32.store
         (get_local $0)
         (i32.const 0)
        )
        (i32.store
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
         (i32.add
          (get_local $5)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (set_local $5
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 3281984)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $3)
         (i32.const 2)
        )
       )
       (set_local $3
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 3281985)
         )
        )
       )
      )
      (br_if $label$3
       (i32.gt_s
        (i32.shr_s
         (i32.shl
          (i32.or
           (get_local $3)
           (get_local $5)
          )
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const -1)
       )
      )
     )
     (set_local $3
      (i32.load
       (i32.add
        (get_local $2)
        (i32.const 4)
       )
      )
     )
    )
    (block $label$7
     (br_if $label$7
      (i32.eqz
       (i32.and
        (get_local $3)
        (i32.const 8)
       )
      )
     )
     (set_local $5
      (i32.const 0)
     )
     (set_local $1
      (i32.add
       (i32.load offset=4331584
        (i32.const 0)
       )
       (i32.load offset=1068
        (i32.const 0)
       )
      )
     )
     (loop $label$8
      (block $label$9
       (block $label$10
        (br_if $label$10
         (i32.lt_s
          (tee_local $3
           (i32.load
            (tee_local $0
             (i32.load offset=4331740
              (i32.const 0)
             )
            )
           )
          )
          (i32.load offset=4
           (get_local $0)
          )
         )
        )
        (block $label$11
         (br_if $label$11
          (tee_local $4
           (call $_Z9getBufferPhj
            (i32.const 3281984)
            (i32.const 1048576)
           )
          )
         )
         (set_local $4
          (i32.const 0)
         )
         (set_local $3
          (i32.const 0)
         )
         (br $label$9)
        )
        (set_local $3
         (i32.const 0)
        )
        (i32.store
         (get_local $0)
         (i32.const 0)
        )
        (i32.store
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
         (i32.add
          (get_local $4)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (set_local $4
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 3281984)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $3)
         (i32.const 2)
        )
       )
       (set_local $3
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 3281985)
         )
        )
       )
      )
      (block $label$12
       (i32.store8
        (tee_local $0
         (i32.add
          (get_local $1)
          (get_local $5)
         )
        )
        (get_local $4)
       )
       (i32.store8
        (i32.add
         (get_local $0)
         (i32.const 1)
        )
        (get_local $3)
       )
       (set_local $5
        (i32.add
         (get_local $5)
         (i32.const 2)
        )
       )
       (br_if $label$12
        (i32.eqz
         (i32.and
          (get_local $4)
          (i32.const 255)
         )
        )
       )
       (br_if $label$8
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
       )
      )
     )
     (br_if $label$7
      (i32.eqz
       (get_local $5)
      )
     )
     (br_if $label$7
      (i32.gt_u
       (tee_local $3
        (i32.add
         (i32.load offset=1068
          (i32.const 0)
         )
         (get_local $5)
        )
       )
       (i32.const 2097152)
      )
     )
     (i32.store offset=8
      (get_local $2)
      (get_local $1)
     )
     (i32.store
      (tee_local $0
       (i32.add
        (get_local $2)
        (i32.const 4)
       )
      )
      (i32.and
       (select
        (i32.or
         (tee_local $0
          (i32.load
           (get_local $0)
          )
         )
         (i32.const 8)
        )
        (i32.and
         (get_local $0)
         (i32.const -41)
        )
        (i32.load8_u
         (get_local $1)
        )
       )
       (i32.const -33)
      )
     )
     (i32.store offset=1068
      (i32.const 0)
      (get_local $3)
     )
    )
    (block $label$13
     (br_if $label$13
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $2)
          (i32.const 5)
         )
        )
        (i32.const 1)
       )
      )
     )
     (set_local $5
      (i32.const 0)
     )
     (set_local $1
      (i32.add
       (i32.load offset=4331588
        (i32.const 0)
       )
       (i32.load offset=1072
        (i32.const 0)
       )
      )
     )
     (loop $label$14
      (block $label$15
       (block $label$16
        (br_if $label$16
         (i32.lt_s
          (tee_local $3
           (i32.load
            (tee_local $0
             (i32.load offset=4331740
              (i32.const 0)
             )
            )
           )
          )
          (i32.load offset=4
           (get_local $0)
          )
         )
        )
        (block $label$17
         (br_if $label$17
          (tee_local $4
           (call $_Z9getBufferPhj
            (i32.const 3281984)
            (i32.const 1048576)
           )
          )
         )
         (set_local $4
          (i32.const 0)
         )
         (set_local $3
          (i32.const 0)
         )
         (br $label$15)
        )
        (set_local $3
         (i32.const 0)
        )
        (i32.store
         (get_local $0)
         (i32.const 0)
        )
        (i32.store
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
         (i32.add
          (get_local $4)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (set_local $4
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 3281984)
         )
        )
       )
       (i32.store
        (get_local $0)
        (i32.add
         (get_local $3)
         (i32.const 2)
        )
       )
       (set_local $3
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 3281985)
         )
        )
       )
      )
      (block $label$18
       (i32.store8
        (tee_local $0
         (i32.add
          (get_local $1)
          (get_local $5)
         )
        )
        (get_local $4)
       )
       (i32.store8
        (i32.add
         (get_local $0)
         (i32.const 1)
        )
        (get_local $3)
       )
       (set_local $5
        (i32.add
         (get_local $5)
         (i32.const 2)
        )
       )
       (br_if $label$18
        (i32.eqz
         (i32.and
          (get_local $4)
          (i32.const 255)
         )
        )
       )
       (br_if $label$14
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
       )
      )
     )
     (br_if $label$13
      (i32.eqz
       (get_local $5)
      )
     )
     (br_if $label$13
      (i32.gt_u
       (i32.add
        (tee_local $3
         (i32.load offset=1072
          (i32.const 0)
         )
        )
        (get_local $5)
       )
       (i32.const 67108863)
      )
     )
     (block $label$19
      (br_if $label$19
       (i32.lt_s
        (get_local $5)
        (i32.const 7)
       )
      )
      (i32.store16 offset=4 align=1
       (get_local $1)
       (i32.const 0)
      )
      (set_local $3
       (i32.load offset=1072
        (i32.const 0)
       )
      )
      (set_local $5
       (i32.const 6)
      )
     )
     (i32.store offset=12
      (get_local $2)
      (get_local $1)
     )
     (i32.store
      (tee_local $0
       (i32.add
        (get_local $2)
        (i32.const 4)
       )
      )
      (select
       (i32.or
        (tee_local $0
         (select
          (i32.or
           (tee_local $0
            (i32.load
             (get_local $0)
            )
           )
           (i32.const 256)
          )
          (i32.and
           (get_local $0)
           (i32.const -257)
          )
          (i32.load8_u
           (get_local $1)
          )
         )
        )
        (i32.const 1)
       )
       (i32.and
        (get_local $0)
        (i32.const -2)
       )
       (i32.and
        (get_local $0)
        (i32.const 16776960)
       )
      )
     )
     (i32.store offset=1072
      (i32.const 0)
      (i32.add
       (get_local $3)
       (get_local $5)
      )
     )
    )
    (i32.store offset=1076
     (i32.const 0)
     (i32.add
      (tee_local $3
       (i32.load offset=1076
        (i32.const 0)
       )
      )
      (i32.const 24)
     )
    )
    (set_local $0
     (call $_ZN11LibraryFile3GetER8MoveNode
      (i32.load offset=4331740
       (i32.const 0)
      )
      (tee_local $2
       (i32.add
        (get_local $3)
        (i32.load offset=4331592
         (i32.const 0)
        )
       )
      )
     )
    )
    (set_local $3
     (i32.load offset=4331848
      (i32.const 0)
     )
    )
    (br_if $label$1
     (get_local $0)
    )
   )
  )
  (get_local $3)
 )
 (func $_ZN11LibraryFile3GetER8MoveNode (; 53 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $5
   (i32.const 0)
  )
  (i32.store16 align=1
   (get_local $1)
   (i32.const 0)
  )
  (i32.store offset=4
   (get_local $1)
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.lt_s
      (tee_local $3
       (i32.load
        (get_local $0)
       )
      )
      (i32.load offset=4
       (get_local $0)
      )
     )
    )
    (br_if $label$0
     (i32.eqz
      (tee_local $2
       (call $_Z9getBufferPhj
        (i32.const 3281984)
        (i32.const 1048576)
       )
      )
     )
    )
    (set_local $3
     (i32.const 0)
    )
    (i32.store
     (get_local $0)
     (i32.const 0)
    )
    (i32.store
     (i32.add
      (get_local $0)
      (i32.const 4)
     )
     (i32.add
      (get_local $2)
      (i32.const -1)
     )
    )
   )
   (set_local $5
    (i32.const 1)
   )
   (i32.store
    (get_local $0)
    (i32.add
     (get_local $3)
     (i32.const 1)
    )
   )
   (set_local $2
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.const 3281984)
     )
    )
   )
   (i32.store
    (get_local $0)
    (i32.add
     (get_local $3)
     (i32.const 2)
    )
   )
   (set_local $3
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.const 3281985)
     )
    )
   )
   (block $label$2
    (block $label$3
     (br_if $label$3
      (i32.eqz
       (get_local $2)
      )
     )
     (set_local $4
      (i32.and
       (get_local $2)
       (i32.const 15)
      )
     )
     (set_local $2
      (i32.add
       (i32.and
        (i32.shl
         (get_local $2)
         (i32.const 4)
        )
        (i32.const 3840)
       )
       (i32.const 256)
      )
     )
     (br $label$2)
    )
    (set_local $4
     (i32.const 0)
    )
    (set_local $2
     (i32.const 0)
    )
   )
   (i32.store16 align=1
    (get_local $1)
    (i32.or
     (get_local $2)
     (get_local $4)
    )
   )
   (i32.store
    (tee_local $2
     (i32.add
      (get_local $1)
      (i32.const 4)
     )
    )
    (i32.or
     (i32.and
      (i32.load
       (get_local $2)
      )
      (i32.const 16776960)
     )
     (get_local $3)
    )
   )
   (br_if $label$0
    (i32.eqz
     (i32.and
      (get_local $3)
      (i32.const 1)
     )
    )
   )
   (block $label$4
    (block $label$5
     (block $label$6
      (br_if $label$6
       (i32.lt_s
        (tee_local $3
         (i32.load
          (get_local $0)
         )
        )
        (i32.load
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
        )
       )
      )
      (br_if $label$5
       (i32.eqz
        (tee_local $5
         (call $_Z9getBufferPhj
          (i32.const 3281984)
          (i32.const 1048576)
         )
        )
       )
      )
      (set_local $3
       (i32.const 0)
      )
      (i32.store
       (get_local $0)
       (i32.const 0)
      )
      (i32.store
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
       (i32.add
        (get_local $5)
        (i32.const -1)
       )
      )
     )
     (set_local $5
      (i32.const 1)
     )
     (i32.store
      (get_local $0)
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (set_local $2
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 3281984)
       )
      )
     )
     (i32.store
      (get_local $0)
      (i32.add
       (get_local $3)
       (i32.const 2)
      )
     )
     (set_local $0
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 3281985)
       )
      )
     )
     (br $label$4)
    )
    (set_local $2
     (i32.const 0)
    )
    (set_local $0
     (i32.const 0)
    )
    (set_local $5
     (i32.const 0)
    )
   )
   (i32.store
    (tee_local $1
     (i32.add
      (get_local $1)
      (i32.const 4)
     )
    )
    (i32.or
     (i32.load8_u
      (get_local $1)
     )
     (i32.shl
      (i32.or
       (i32.shl
        (i32.and
         (get_local $2)
         (i32.const 255)
        )
        (i32.const 8)
       )
       (i32.and
        (get_local $0)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
    )
   )
  )
  (get_local $5)
 )
 (func $_Z15createRenjuTreev (; 54 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store offset=904
   (i32.load offset=4331736
    (i32.const 0)
   )
   (i32.const 0)
  )
  (set_local $5
   (i32.const 1)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (tee_local $4
      (i32.load offset=4331848
       (i32.const 0)
      )
     )
     (i32.const 2)
    )
   )
   (set_local $0
    (i32.const 1)
   )
   (set_local $6
    (tee_local $1
     (i32.load offset=4331728
      (i32.const 0)
     )
    )
   )
   (loop $label$1
    (set_local $2
     (i32.add
      (get_local $1)
      (i32.const 24)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.rem_u
       (get_local $0)
       (i32.const 300000)
      )
     )
     (call $_Z7loadingjj
      (get_local $0)
      (get_local $4)
     )
    )
    (set_local $3
     (i32.shr_u
      (tee_local $5
       (i32.load16_u align=1
        (get_local $2)
       )
      )
      (i32.const 8)
     )
    )
    (block $label$3
     (block $label$4
      (block $label$5
       (block $label$6
        (block $label$7
         (block $label$8
          (block $label$9
           (block $label$10
            (block $label$11
             (block $label$12
              (block $label$13
               (br_if $label$13
                (i32.eqz
                 (tee_local $4
                  (i32.and
                   (get_local $5)
                   (i32.const 255)
                  )
                 )
                )
               )
               (set_local $5
                (i32.const 0)
               )
               (br_if $label$0
                (i32.gt_u
                 (get_local $4)
                 (i32.const 15)
                )
               )
               (br_if $label$0
                (i32.gt_u
                 (i32.and
                  (i32.add
                   (get_local $3)
                   (i32.const -1)
                  )
                  (i32.const 255)
                 )
                 (i32.const 14)
                )
               )
               (br_if $label$11
                (i32.eqz
                 (tee_local $5
                  (i32.load offset=16
                   (get_local $6)
                  )
                 )
                )
               )
               (br_if $label$12
                (i32.ne
                 (i32.load8_u
                  (get_local $5)
                 )
                 (get_local $4)
                )
               )
               (br_if $label$12
                (i32.ne
                 (i32.load8_u offset=1
                  (get_local $5)
                 )
                 (get_local $3)
                )
               )
               (br_if $label$8
                (i32.eqz
                 (i32.load offset=8
                  (tee_local $6
                   (get_local $5)
                  )
                 )
                )
               )
               (br $label$7)
              )
              (br_if $label$3
               (i32.eqz
                (get_local $3)
               )
              )
              (br $label$10)
             )
             (br_if $label$11
              (i32.eqz
               (tee_local $5
                (i32.load offset=20
                 (get_local $5)
                )
               )
              )
             )
             (loop $label$14
              (block $label$15
               (br_if $label$15
                (i32.ne
                 (i32.load8_u
                  (get_local $5)
                 )
                 (get_local $4)
                )
               )
               (br_if $label$9
                (i32.eq
                 (i32.load8_u offset=1
                  (get_local $5)
                 )
                 (get_local $3)
                )
               )
              )
              (br_if $label$14
               (tee_local $5
                (i32.load offset=20
                 (get_local $5)
                )
               )
              )
             )
            )
            (call $_Z7addMoveP8MoveNodeS0_
             (get_local $6)
             (get_local $2)
            )
            (set_local $6
             (get_local $2)
            )
            (br $label$4)
           )
           (return
            (i32.const 0)
           )
          )
          (br_if $label$7
           (i32.load offset=8
            (tee_local $6
             (get_local $5)
            )
           )
          )
         )
         (i32.store
          (i32.add
           (get_local $6)
           (i32.const 8)
          )
          (i32.load
           (i32.add
            (get_local $1)
            (i32.const 32)
           )
          )
         )
         (br_if $label$5
          (i32.load offset=12
           (get_local $6)
          )
         )
         (br $label$6)
        )
        (br_if $label$5
         (i32.load offset=12
          (get_local $6)
         )
        )
       )
       (i32.store
        (i32.add
         (get_local $6)
         (i32.const 12)
        )
        (i32.load
         (i32.add
          (get_local $1)
          (i32.const 36)
         )
        )
       )
      )
      (block $label$16
       (block $label$17
        (block $label$18
         (br_if $label$18
          (i32.eqz
           (i32.and
            (tee_local $5
             (i32.load
              (tee_local $4
               (i32.add
                (get_local $1)
                (i32.const 28)
               )
              )
             )
            )
            (i32.const 16)
           )
          )
         )
         (br_if $label$18
          (i32.and
           (tee_local $3
            (i32.load offset=4
             (get_local $6)
            )
           )
           (i32.const 16)
          )
         )
         (i32.store
          (i32.add
           (get_local $6)
           (i32.const 4)
          )
          (i32.or
           (get_local $3)
           (i32.const 16)
          )
         )
         (br_if $label$16
          (i32.and
           (tee_local $5
            (i32.load
             (get_local $4)
            )
           )
           (i32.const 2)
          )
         )
         (br $label$17)
        )
        (br_if $label$16
         (i32.and
          (get_local $5)
          (i32.const 2)
         )
        )
       )
       (br_if $label$16
        (i32.eqz
         (i32.and
          (tee_local $3
           (i32.load offset=4
            (get_local $6)
           )
          )
          (i32.const 2)
         )
        )
       )
       (i32.store
        (i32.add
         (get_local $6)
         (i32.const 4)
        )
        (i32.and
         (get_local $3)
         (i32.const -3)
        )
       )
       (set_local $5
        (i32.load
         (get_local $4)
        )
       )
      )
      (br_if $label$4
       (i32.eqz
        (i32.and
         (get_local $5)
         (i32.const 4)
        )
       )
      )
      (br_if $label$4
       (i32.and
        (tee_local $5
         (i32.load offset=4
          (get_local $6)
         )
        )
        (i32.const 4)
       )
      )
      (i32.store
       (i32.add
        (get_local $6)
        (i32.const 4)
       )
       (i32.or
        (get_local $5)
        (i32.const 4)
       )
      )
     )
     (i32.store offset=904
      (tee_local $5
       (i32.load offset=4331736
        (i32.const 0)
       )
      )
      (tee_local $4
       (i32.add
        (i32.load offset=904
         (get_local $5)
        )
        (i32.const 1)
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $5)
       (i32.shl
        (get_local $4)
        (i32.const 2)
       )
      )
      (get_local $6)
     )
    )
    (block $label$19
     (br_if $label$19
      (i32.eqz
       (i32.and
        (tee_local $5
         (i32.load
          (i32.add
           (get_local $1)
           (i32.const 28)
          )
         )
        )
        (i32.const 128)
       )
      )
     )
     (br_if $label$19
      (i32.lt_s
       (tee_local $3
        (i32.load offset=904
         (i32.load offset=4331736
          (i32.const 0)
         )
        )
       )
       (i32.const 1)
      )
     )
     (i32.store
      (i32.add
       (tee_local $4
        (i32.load offset=4331732
         (i32.const 0)
        )
       )
       (i32.shl
        (i32.load offset=1800
         (get_local $4)
        )
        (i32.const 3)
       )
      )
      (get_local $3)
     )
     (i32.store offset=1800
      (get_local $4)
      (i32.add
       (tee_local $3
        (i32.load offset=1800
         (get_local $4)
        )
       )
       (i32.const 1)
      )
     )
     (i32.store offset=4
      (i32.add
       (get_local $4)
       (i32.shl
        (get_local $3)
        (i32.const 3)
       )
      )
      (i32.const 0)
     )
    )
    (block $label$20
     (br_if $label$20
      (i32.eqz
       (i32.and
        (get_local $5)
        (i32.const 64)
       )
      )
     )
     (block $label$21
      (block $label$22
       (br_if $label$22
        (i32.eqz
         (tee_local $4
          (i32.load offset=1800
           (tee_local $5
            (i32.load offset=4331732
             (i32.const 0)
            )
           )
          )
         )
        )
       )
       (i32.store
        (i32.add
         (get_local $5)
         (i32.const 1800)
        )
        (tee_local $4
         (i32.add
          (get_local $4)
          (i32.const -1)
         )
        )
       )
       (i32.store offset=904
        (tee_local $3
         (i32.load offset=4331736
          (i32.const 0)
         )
        )
        (tee_local $5
         (i32.add
          (i32.load
           (i32.add
            (get_local $5)
            (i32.shl
             (get_local $4)
             (i32.const 3)
            )
           )
          )
          (i32.const -1)
         )
        )
       )
       (set_local $5
        (i32.add
         (get_local $3)
         (i32.shl
          (get_local $5)
          (i32.const 2)
         )
        )
       )
       (br $label$21)
      )
      (i32.store offset=904
       (tee_local $5
        (i32.load offset=4331736
         (i32.const 0)
        )
       )
       (i32.const 0)
      )
     )
     (set_local $6
      (i32.load
       (get_local $5)
      )
     )
    )
    (set_local $5
     (i32.const 1)
    )
    (set_local $1
     (get_local $2)
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
      (tee_local $4
       (i32.load offset=4331848
        (i32.const 0)
       )
      )
     )
    )
   )
  )
  (get_local $5)
 )
 (func $_Z10addLibraryv (; 55 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $4
   (i32.const -1)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (call $_Z12checkVersionv)
    )
   )
   (i32.store offset=4331848
    (i32.const 0)
    (i32.const 0)
   )
   (set_local $4
    (i32.const 4331728)
   )
   (loop $label$1
    (set_local $0
     (i32.load
      (get_local $4)
     )
    )
    (loop $label$2
     (i32.store offset=1076
      (i32.const 0)
      (i32.add
       (tee_local $4
        (i32.load offset=1076
         (i32.const 0)
        )
       )
       (i32.const 24)
      )
     )
     (set_local $2
      (call $_ZN11LibraryFile3GetER8MoveNode
       (i32.load offset=4331740
        (i32.const 0)
       )
       (tee_local $1
        (i32.add
         (get_local $4)
         (i32.load offset=4331592
          (i32.const 0)
         )
        )
       )
      )
     )
     (set_local $4
      (i32.load offset=4331848
       (i32.const 0)
      )
     )
     (br_if $label$0
      (i32.eqz
       (get_local $2)
      )
     )
     (i32.store offset=4331848
      (i32.const 0)
      (i32.add
       (get_local $4)
       (i32.const 1)
      )
     )
     (set_local $6
      (i32.shr_u
       (tee_local $2
        (i32.load16_u align=1
         (get_local $1)
        )
       )
       (i32.const 8)
      )
     )
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (block $label$7
          (block $label$8
           (block $label$9
            (br_if $label$9
             (i32.eqz
              (tee_local $2
               (i32.and
                (get_local $2)
                (i32.const 255)
               )
              )
             )
            )
            (br_if $label$6
             (i32.gt_u
              (get_local $2)
              (i32.const 15)
             )
            )
            (br_if $label$6
             (i32.gt_u
              (i32.and
               (i32.add
                (get_local $6)
                (i32.const -1)
               )
               (i32.const 255)
              )
              (i32.const 14)
             )
            )
            (br_if $label$7
             (i32.eqz
              (tee_local $4
               (i32.load offset=16
                (get_local $0)
               )
              )
             )
            )
            (br_if $label$8
             (i32.ne
              (i32.load8_u
               (get_local $4)
              )
              (get_local $2)
             )
            )
            (br_if $label$8
             (i32.ne
              (i32.load8_u offset=1
               (get_local $4)
              )
              (get_local $6)
             )
            )
            (set_local $0
             (get_local $4)
            )
            (br $label$4)
           )
           (br_if $label$3
            (i32.eqz
             (get_local $6)
            )
           )
           (br $label$6)
          )
          (br_if $label$7
           (i32.eqz
            (tee_local $4
             (i32.load offset=20
              (get_local $4)
             )
            )
           )
          )
          (loop $label$10
           (block $label$11
            (br_if $label$11
             (i32.ne
              (i32.load8_u
               (get_local $4)
              )
              (get_local $2)
             )
            )
            (br_if $label$5
             (i32.eq
              (i32.load8_u offset=1
               (get_local $4)
              )
              (get_local $6)
             )
            )
           )
           (br_if $label$10
            (tee_local $4
             (i32.load offset=20
              (get_local $4)
             )
            )
           )
          )
         )
         (call $_Z7addMoveP8MoveNodeS0_
          (get_local $0)
          (get_local $1)
         )
         (set_local $0
          (get_local $1)
         )
         (br $label$4)
        )
        (set_local $4
         (i32.xor
          (get_local $4)
          (i32.const -1)
         )
        )
        (br $label$0)
       )
       (set_local $0
        (get_local $4)
       )
      )
      (i32.store offset=904
       (tee_local $4
        (i32.load offset=4331736
         (i32.const 0)
        )
       )
       (tee_local $2
        (i32.add
         (i32.load offset=904
          (get_local $4)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store
       (i32.add
        (get_local $4)
        (i32.shl
         (get_local $2)
         (i32.const 2)
        )
       )
       (get_local $0)
      )
     )
     (block $label$12
      (br_if $label$12
       (i32.eqz
        (i32.and
         (tee_local $4
          (i32.load offset=4
           (get_local $1)
          )
         )
         (i32.const 32)
        )
       )
      )
      (i32.store8 offset=67648
       (i32.const 0)
       (i32.const 0)
      )
      (loop $label$13
       (block $label$14
        (block $label$15
         (br_if $label$15
          (i32.lt_s
           (tee_local $4
            (i32.load
             (tee_local $2
              (i32.load offset=4331740
               (i32.const 0)
              )
             )
            )
           )
           (i32.load offset=4
            (get_local $2)
           )
          )
         )
         (block $label$16
          (br_if $label$16
           (tee_local $6
            (call $_Z9getBufferPhj
             (i32.const 3281984)
             (i32.const 1048576)
            )
           )
          )
          (set_local $6
           (i32.const 0)
          )
          (set_local $4
           (i32.const 0)
          )
          (br $label$14)
         )
         (set_local $4
          (i32.const 0)
         )
         (i32.store
          (get_local $2)
          (i32.const 0)
         )
         (i32.store
          (i32.add
           (get_local $2)
           (i32.const 4)
          )
          (i32.add
           (get_local $6)
           (i32.const -1)
          )
         )
        )
        (i32.store
         (get_local $2)
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (set_local $6
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 3281984)
          )
         )
        )
        (i32.store
         (get_local $2)
         (i32.add
          (get_local $4)
          (i32.const 2)
         )
        )
        (set_local $4
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 3281985)
          )
         )
        )
       )
       (br_if $label$13
        (i32.gt_s
         (i32.shr_s
          (i32.shl
           (i32.or
            (get_local $4)
            (get_local $6)
           )
           (i32.const 24)
          )
          (i32.const 24)
         )
         (i32.const -1)
        )
       )
      )
      (set_local $4
       (i32.load
        (i32.add
         (get_local $1)
         (i32.const 4)
        )
       )
      )
     )
     (block $label$17
      (br_if $label$17
       (i32.eqz
        (i32.and
         (get_local $4)
         (i32.const 8)
        )
       )
      )
      (set_local $6
       (i32.const 0)
      )
      (set_local $3
       (i32.add
        (i32.load offset=4331584
         (i32.const 0)
        )
        (i32.load offset=1068
         (i32.const 0)
        )
       )
      )
      (loop $label$18
       (block $label$19
        (block $label$20
         (br_if $label$20
          (i32.lt_s
           (tee_local $4
            (i32.load
             (tee_local $2
              (i32.load offset=4331740
               (i32.const 0)
              )
             )
            )
           )
           (i32.load offset=4
            (get_local $2)
           )
          )
         )
         (block $label$21
          (br_if $label$21
           (tee_local $5
            (call $_Z9getBufferPhj
             (i32.const 3281984)
             (i32.const 1048576)
            )
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $4
           (i32.const 0)
          )
          (br $label$19)
         )
         (set_local $4
          (i32.const 0)
         )
         (i32.store
          (get_local $2)
          (i32.const 0)
         )
         (i32.store
          (i32.add
           (get_local $2)
           (i32.const 4)
          )
          (i32.add
           (get_local $5)
           (i32.const -1)
          )
         )
        )
        (i32.store
         (get_local $2)
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (set_local $5
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 3281984)
          )
         )
        )
        (i32.store
         (get_local $2)
         (i32.add
          (get_local $4)
          (i32.const 2)
         )
        )
        (set_local $4
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 3281985)
          )
         )
        )
       )
       (block $label$22
        (i32.store8
         (tee_local $2
          (i32.add
           (get_local $3)
           (get_local $6)
          )
         )
         (get_local $5)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 1)
         )
         (get_local $4)
        )
        (set_local $6
         (i32.add
          (get_local $6)
          (i32.const 2)
         )
        )
        (br_if $label$22
         (i32.eqz
          (i32.and
           (get_local $5)
           (i32.const 255)
          )
         )
        )
        (br_if $label$18
         (i32.and
          (get_local $4)
          (i32.const 255)
         )
        )
       )
      )
      (br_if $label$17
       (i32.eqz
        (get_local $6)
       )
      )
      (br_if $label$17
       (i32.gt_u
        (i32.add
         (i32.load offset=1068
          (i32.const 0)
         )
         (get_local $6)
        )
        (i32.const 2097152)
       )
      )
      (i32.store offset=8
       (get_local $1)
       (get_local $3)
      )
      (i32.store
       (tee_local $4
        (i32.add
         (get_local $1)
         (i32.const 4)
        )
       )
       (i32.and
        (select
         (i32.or
          (tee_local $4
           (i32.load
            (get_local $4)
           )
          )
          (i32.const 8)
         )
         (i32.and
          (get_local $4)
          (i32.const -41)
         )
         (i32.load8_u
          (get_local $3)
         )
        )
        (i32.const -33)
       )
      )
      (i32.store offset=1068
       (i32.const 0)
       (i32.add
        (i32.load offset=1068
         (i32.const 0)
        )
        (get_local $6)
       )
      )
     )
     (block $label$23
      (br_if $label$23
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (i32.const 5)
          )
         )
         (i32.const 1)
        )
       )
      )
      (set_local $6
       (i32.const 0)
      )
      (set_local $3
       (i32.add
        (i32.load offset=4331588
         (i32.const 0)
        )
        (i32.load offset=1072
         (i32.const 0)
        )
       )
      )
      (loop $label$24
       (block $label$25
        (block $label$26
         (br_if $label$26
          (i32.lt_s
           (tee_local $4
            (i32.load
             (tee_local $2
              (i32.load offset=4331740
               (i32.const 0)
              )
             )
            )
           )
           (i32.load offset=4
            (get_local $2)
           )
          )
         )
         (block $label$27
          (br_if $label$27
           (tee_local $5
            (call $_Z9getBufferPhj
             (i32.const 3281984)
             (i32.const 1048576)
            )
           )
          )
          (set_local $5
           (i32.const 0)
          )
          (set_local $4
           (i32.const 0)
          )
          (br $label$25)
         )
         (set_local $4
          (i32.const 0)
         )
         (i32.store
          (get_local $2)
          (i32.const 0)
         )
         (i32.store
          (i32.add
           (get_local $2)
           (i32.const 4)
          )
          (i32.add
           (get_local $5)
           (i32.const -1)
          )
         )
        )
        (i32.store
         (get_local $2)
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (set_local $5
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 3281984)
          )
         )
        )
        (i32.store
         (get_local $2)
         (i32.add
          (get_local $4)
          (i32.const 2)
         )
        )
        (set_local $4
         (i32.load8_u
          (i32.add
           (get_local $4)
           (i32.const 3281985)
          )
         )
        )
       )
       (block $label$28
        (i32.store8
         (tee_local $2
          (i32.add
           (get_local $3)
           (get_local $6)
          )
         )
         (get_local $5)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 1)
         )
         (get_local $4)
        )
        (set_local $6
         (i32.add
          (get_local $6)
          (i32.const 2)
         )
        )
        (br_if $label$28
         (i32.eqz
          (i32.and
           (get_local $5)
           (i32.const 255)
          )
         )
        )
        (br_if $label$24
         (i32.and
          (get_local $4)
          (i32.const 255)
         )
        )
       )
      )
      (br_if $label$23
       (i32.eqz
        (get_local $6)
       )
      )
      (br_if $label$23
       (i32.gt_u
        (i32.add
         (i32.load offset=1072
          (i32.const 0)
         )
         (get_local $6)
        )
        (i32.const 67108863)
       )
      )
      (block $label$29
       (br_if $label$29
        (i32.lt_s
         (get_local $6)
         (i32.const 7)
        )
       )
       (i32.store16 offset=4 align=1
        (get_local $3)
        (i32.const 0)
       )
       (set_local $6
        (i32.const 6)
       )
      )
      (i32.store offset=12
       (get_local $1)
       (get_local $3)
      )
      (i32.store
       (tee_local $4
        (i32.add
         (get_local $1)
         (i32.const 4)
        )
       )
       (select
        (i32.or
         (tee_local $4
          (select
           (i32.or
            (tee_local $4
             (i32.load
              (get_local $4)
             )
            )
            (i32.const 256)
           )
           (i32.and
            (get_local $4)
            (i32.const -257)
           )
           (i32.load8_u
            (get_local $3)
           )
          )
         )
         (i32.const 1)
        )
        (i32.and
         (get_local $4)
         (i32.const -2)
        )
        (i32.and
         (get_local $4)
         (i32.const 16776960)
        )
       )
      )
      (i32.store offset=1072
       (i32.const 0)
       (i32.add
        (i32.load offset=1072
         (i32.const 0)
        )
        (get_local $6)
       )
      )
     )
     (block $label$30
      (block $label$31
       (block $label$32
        (block $label$33
         (block $label$34
          (block $label$35
           (block $label$36
            (block $label$37
             (block $label$38
              (block $label$39
               (br_if $label$39
                (i32.eqz
                 (i32.and
                  (tee_local $4
                   (i32.load
                    (tee_local $2
                     (i32.add
                      (get_local $1)
                      (i32.const 4)
                     )
                    )
                   )
                  )
                  (i32.const 16)
                 )
                )
               )
               (br_if $label$38
                (i32.eqz
                 (i32.and
                  (tee_local $6
                   (i32.load offset=4
                    (get_local $0)
                   )
                  )
                  (i32.const 16)
                 )
                )
               )
              )
              (br_if $label$36
               (i32.and
                (get_local $4)
                (i32.const 2)
               )
              )
              (br $label$37)
             )
             (i32.store
              (i32.add
               (get_local $0)
               (i32.const 4)
              )
              (i32.or
               (get_local $6)
               (i32.const 16)
              )
             )
             (br_if $label$36
              (i32.and
               (tee_local $4
                (i32.load
                 (get_local $2)
                )
               )
               (i32.const 2)
              )
             )
            )
            (br_if $label$36
             (i32.eqz
              (i32.and
               (tee_local $6
                (i32.load offset=4
                 (get_local $0)
                )
               )
               (i32.const 2)
              )
             )
            )
            (i32.store
             (i32.add
              (get_local $0)
              (i32.const 4)
             )
             (i32.and
              (get_local $6)
              (i32.const -3)
             )
            )
            (br_if $label$35
             (i32.and
              (tee_local $4
               (i32.load
                (get_local $2)
               )
              )
              (i32.const 4)
             )
            )
            (br $label$34)
           )
           (br_if $label$34
            (i32.eqz
             (i32.and
              (get_local $4)
              (i32.const 4)
             )
            )
           )
          )
          (br_if $label$33
           (i32.eqz
            (i32.and
             (tee_local $6
              (i32.load offset=4
               (get_local $0)
              )
             )
             (i32.const 4)
            )
           )
          )
         )
         (br_if $label$31
          (i32.eqz
           (i32.and
            (get_local $4)
            (i32.const 128)
           )
          )
         )
         (br $label$32)
        )
        (i32.store
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
         (i32.or
          (get_local $6)
          (i32.const 4)
         )
        )
        (br_if $label$31
         (i32.eqz
          (i32.and
           (tee_local $4
            (i32.load
             (get_local $2)
            )
           )
           (i32.const 128)
          )
         )
        )
       )
       (br_if $label$31
        (i32.lt_s
         (tee_local $6
          (i32.load offset=904
           (i32.load offset=4331736
            (i32.const 0)
           )
          )
         )
         (i32.const 1)
        )
       )
       (i32.store
        (i32.add
         (tee_local $2
          (i32.load offset=4331732
           (i32.const 0)
          )
         )
         (i32.shl
          (i32.load offset=1800
           (get_local $2)
          )
          (i32.const 3)
         )
        )
        (get_local $6)
       )
       (i32.store offset=1800
        (get_local $2)
        (i32.add
         (tee_local $6
          (i32.load offset=1800
           (get_local $2)
          )
         )
         (i32.const 1)
        )
       )
       (i32.store offset=4
        (i32.add
         (get_local $2)
         (i32.shl
          (get_local $6)
          (i32.const 3)
         )
        )
        (i32.const 0)
       )
       (br_if $label$2
        (i32.eqz
         (i32.and
          (get_local $4)
          (i32.const 64)
         )
        )
       )
       (br $label$30)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (get_local $4)
         (i32.const 64)
        )
       )
      )
     )
    )
    (block $label$40
     (br_if $label$40
      (tee_local $2
       (i32.load offset=1800
        (tee_local $4
         (i32.load offset=4331732
          (i32.const 0)
         )
        )
       )
      )
     )
     (i32.store offset=904
      (tee_local $4
       (i32.load offset=4331736
        (i32.const 0)
       )
      )
      (i32.const 0)
     )
     (br $label$1)
    )
    (i32.store
     (i32.add
      (get_local $4)
      (i32.const 1800)
     )
     (tee_local $2
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
    (i32.store offset=904
     (tee_local $6
      (i32.load offset=4331736
       (i32.const 0)
      )
     )
     (tee_local $4
      (i32.add
       (i32.load
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $2)
          (i32.const 3)
         )
        )
       )
       (i32.const -1)
      )
     )
    )
    (set_local $4
     (i32.add
      (get_local $6)
      (i32.shl
       (get_local $4)
       (i32.const 2)
      )
     )
    )
    (br $label$1)
   )
  )
  (get_local $4)
 )
 (func $_Z4initj (; 56 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $1
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 2097150)
    )
   )
   (set_local $2
    (i32.const 10)
   )
   (set_local $4
    (i32.const 0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $3
        (i32.add
         (get_local $1)
         (get_local $4)
        )
       )
       (i32.const 134208)
      )
      (get_local $2)
     )
     (set_local $5
      (i32.add
       (get_local $4)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $3)
        (i32.const 1)
       )
       (i32.const 2097150)
      )
     )
     (set_local $2
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 4331856)
       )
      )
     )
     (set_local $3
      (i32.ne
       (get_local $4)
       (i32.const 12)
      )
     )
     (set_local $4
      (get_local $5)
     )
     (br_if $label$2
      (get_local $3)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $4
     (i32.add
      (get_local $1)
      (get_local $5)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $4)
     (i32.const 134208)
    )
    (i32.const 0)
   )
  )
  (drop
   (call $_Z4growj
    (i32.add
     (i32.shr_u
      (i32.add
       (i32.shl
        (i32.div_u
         (get_local $0)
         (i32.const 7)
        )
        (i32.const 2)
       )
       (i32.const 2097152)
      )
      (i32.const 16)
     )
     (i32.const 33)
    )
   )
  )
  (i32.store16 offset=134208
   (i32.const 0)
   (i32.const 29194)
  )
  (i32.store8 offset=134210
   (i32.const 0)
   (i32.const 101)
  )
  (i32.store offset=1068
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1064
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1072
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1080
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store8 offset=134211
   (i32.const 0)
   (i32.const 115)
  )
  (i32.store8 offset=134212
   (i32.const 0)
   (i32.const 101)
  )
  (i32.store8 offset=134213
   (i32.const 0)
   (i32.const 116)
  )
  (i32.store8 offset=134214
   (i32.const 0)
   (i32.const 32)
  )
  (i32.store8 offset=134215
   (i32.const 0)
   (i32.const 109)
  )
  (i32.store8 offset=134216
   (i32.const 0)
   (i32.const 95)
  )
  (i32.store8 offset=134217
   (i32.const 0)
   (i32.const 83)
  )
  (i32.store8 offset=134218
   (i32.const 0)
   (i32.const 116)
  )
  (i32.store8 offset=134219
   (i32.const 0)
   (i32.const 97)
  )
  (i32.store8 offset=134220
   (i32.const 0)
   (i32.const 99)
  )
  (i32.store8 offset=134221
   (i32.const 0)
   (i32.const 107)
  )
  (i32.store offset=1060
   (i32.const 0)
   (i32.const 14)
  )
  (i32.store8 offset=134222
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 1804)
  )
  (i32.store offset=4331732
   (i32.const 0)
   (tee_local $4
    (i32.load offset=4331592
     (i32.const 0)
    )
   )
  )
  (set_local $1
   (call $memset
    (get_local $4)
    (i32.const 0)
    (i32.const 1804)
   )
  )
  (i32.store offset=134222 align=2
   (i32.const 0)
   (i32.const 1936028170)
  )
  (i32.store16 offset=134226
   (i32.const 0)
   (i32.const 29797)
  )
  (i32.store offset=134228
   (i32.const 0)
   (i32.const 1298099488)
  )
  (i32.store16 offset=134232
   (i32.const 0)
   (i32.const 30319)
  )
  (i32.store16 offset=134234
   (i32.const 0)
   (i32.const 19557)
  )
  (i32.store8 offset=134236
   (i32.const 0)
   (i32.const 105)
  )
  (i32.store8 offset=134237
   (i32.const 0)
   (i32.const 115)
  )
  (i32.store8 offset=134238
   (i32.const 0)
   (i32.const 116)
  )
  (set_local $4
   (i32.const 31)
  )
  (i32.store offset=1060
   (i32.const 0)
   (i32.const 31)
  )
  (i32.store8 offset=134239
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 2712)
  )
  (i32.store offset=4331736
   (i32.const 0)
   (tee_local $2
    (i32.add
     (get_local $1)
     (i32.const 1804)
    )
   )
  )
  (drop
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 904)
   )
  )
  (i32.store offset=2708
   (get_local $1)
   (i32.const -1)
  )
  (set_local $5
   (i32.const 10)
  )
  (block $label$3
   (loop $label$4
    (i32.store8
     (i32.add
      (get_local $4)
      (i32.const 134208)
     )
     (get_local $5)
    )
    (br_if $label$3
     (i32.gt_u
      (tee_local $2
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
      )
      (i32.const 2097150)
     )
    )
    (set_local $5
     (i32.load8_u
      (i32.add
       (get_local $4)
       (i32.const 4331841)
      )
     )
    )
    (set_local $3
     (i32.ne
      (get_local $4)
      (i32.const 43)
     )
    )
    (set_local $4
     (get_local $2)
    )
    (br_if $label$4
     (get_local $3)
    )
   )
  )
  (i32.store offset=1060
   (i32.const 0)
   (get_local $2)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 2728)
  )
  (i32.store8
   (i32.add
    (get_local $2)
    (i32.const 134208)
   )
   (i32.const 0)
  )
  (i32.store offset=4331740
   (i32.const 0)
   (i32.add
    (get_local $1)
    (i32.const 2712)
   )
  )
  (i32.const 32)
 )
)
