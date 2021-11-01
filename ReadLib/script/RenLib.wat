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
 (memory $0 308)
 (data (i32.const 1060) "\00\00\00\00")
 (data (i32.const 1064) "\00\00\00\00")
 (data (i32.const 1068) "\00\00\00\00")
 (data (i32.const 1072) "\00\00\00\00")
 (data (i32.const 1076) "\03\00\00\00")
 (data (i32.const 1080) "\04\00\00\00")
 (data (i32.const 20127808) "ABCDEFGHIJKLMNOPQRSTUVWXYZ\00")
 (data (i32.const 20127836) "@ 3\01")
 (data (i32.const 20127840) "0123456789\00")
 (data (i32.const 20127852) "` 3\01")
 (data (i32.const 20127872) "newCPoint\00")
 (data (i32.const 20127888) "newCPoint end\00")
 (data (i32.const 20127904) "newMoveNode\00")
 (data (i32.const 20127920) "newMoveNode end\00")
 (data (i32.const 20127936) "\00\00\00\00")
 (data (i32.const 20127940) "\00\00\00\00")
 (data (i32.const 20127944) "\00\00\00\00")
 (data (i32.const 20127948) "\00\00\00\00")
 (data (i32.const 20127952) "m_MoveList SetRoot()\00")
 (data (i32.const 20127984) "m_MoveList Add()\00")
 (data (i32.const 20128016) "getVariant()\00")
 (data (i32.const 20128032) "getVariant return <<\00")
 (data (i32.const 20128056) "\00\00\00\00")
 (data (i32.const 20128064) "wasm >> init\00")
 (data (i32.const 20128080) "reset m_Stack\00")
 (data (i32.const 20128096) "reset m_MoveList\00")
 (data (i32.const 20128128) "reset m_file\00")
 (data (i32.const 20128144) "\ffRenLib\ff\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 20128176) "checking code\00")
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
 (export "_Z14getBranchNodesP6CPointi" (func $_Z14getBranchNodesP6CPointi))
 (export "_Z12checkVersionv" (func $_Z12checkVersionv))
 (export "_Z15loadAllMoveNodev" (func $_Z15loadAllMoveNodev))
 (export "_Z15createRenjuTreev" (func $_Z15createRenjuTreev))
 (export "_Z10addLibraryv" (func $_Z10addLibraryv))
 (export "_Z4initv" (func $_Z4initv))
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
     (i32.const 8388606)
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
       (i32.const 8388606)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
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
       (i32.const 8523840)
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
     (i32.const 8523840)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
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
  (i32.const 8523840)
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
  (set_local $7
   (i32.const 9573440)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (i32.add
       (tee_local $4
        (i32.sub
         (tee_local $3
          (i32.add
           (tee_local $2
            (i32.load offset=1068
             (i32.const 0)
            )
           )
           (i32.const 9573440)
          )
         )
         (get_local $1)
        )
       )
       (i32.const 1)
      )
      (i32.const 9573440)
     )
    )
    (loop $label$2
     (set_local $6
      (i32.const 0)
     )
     (block $label$3
      (loop $label$4
       (br_if $label$3
        (i32.ne
         (tee_local $5
          (i32.load8_u
           (i32.add
            (get_local $7)
            (get_local $6)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $0)
           (get_local $6)
          )
         )
        )
       )
       (br_if $label$4
        (i32.lt_u
         (tee_local $6
          (i32.add
           (get_local $6)
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
        (get_local $5)
       )
      )
      (loop $label$6
       (br_if $label$6
        (i32.load8_u
         (tee_local $7
          (i32.add
           (get_local $7)
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
         (tee_local $7
          (i32.add
           (get_local $7)
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
        (get_local $7)
        (i32.const -1)
       )
       (get_local $4)
      )
     )
    )
   )
   (block $label$8
    (br_if $label$8
     (i32.gt_u
      (tee_local $6
       (i32.add
        (get_local $2)
        (get_local $1)
       )
      )
      (i32.const 1048576)
     )
    )
    (block $label$9
     (br_if $label$9
      (i32.eqz
       (get_local $1)
      )
     )
     (set_local $7
      (i32.add
       (get_local $2)
       (i32.const 9573440)
      )
     )
     (loop $label$10
      (i32.store8
       (get_local $7)
       (i32.load8_u
        (get_local $0)
       )
      )
      (set_local $7
       (i32.add
        (get_local $7)
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
       (tee_local $1
        (i32.add
         (get_local $1)
         (i32.const -1)
        )
       )
      )
     )
    )
    (i32.store offset=1068
     (i32.const 0)
     (get_local $6)
    )
    (set_local $8
     (get_local $3)
    )
   )
   (return
    (get_local $8)
   )
  )
  (get_local $7)
 )
 (func $_Z16getCommentBufferv (; 14 ;) (result i32)
  (i32.const 9573440)
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
  (set_local $7
   (i32.const 10623040)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (i32.add
       (tee_local $4
        (i32.sub
         (tee_local $3
          (i32.add
           (tee_local $2
            (i32.load offset=1072
             (i32.const 0)
            )
           )
           (i32.const 10623040)
          )
         )
         (get_local $1)
        )
       )
       (i32.const 1)
      )
      (i32.const 10623040)
     )
    )
    (loop $label$2
     (set_local $6
      (i32.const 0)
     )
     (block $label$3
      (loop $label$4
       (br_if $label$3
        (i32.ne
         (tee_local $5
          (i32.load8_u
           (i32.add
            (get_local $7)
            (get_local $6)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $0)
           (get_local $6)
          )
         )
        )
       )
       (br_if $label$4
        (i32.lt_u
         (tee_local $6
          (i32.add
           (get_local $6)
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
        (get_local $5)
       )
      )
      (loop $label$6
       (br_if $label$6
        (i32.load8_u
         (tee_local $7
          (i32.add
           (get_local $7)
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
         (tee_local $7
          (i32.add
           (get_local $7)
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
        (get_local $7)
        (i32.const -1)
       )
       (get_local $4)
      )
     )
    )
   )
   (block $label$8
    (br_if $label$8
     (i32.gt_u
      (tee_local $6
       (i32.add
        (get_local $2)
        (get_local $1)
       )
      )
      (i32.const 1048576)
     )
    )
    (block $label$9
     (br_if $label$9
      (i32.eqz
       (get_local $1)
      )
     )
     (set_local $7
      (i32.add
       (get_local $2)
       (i32.const 10623040)
      )
     )
     (loop $label$10
      (i32.store8
       (get_local $7)
       (i32.load8_u
        (get_local $0)
       )
      )
      (set_local $7
       (i32.add
        (get_local $7)
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
       (tee_local $1
        (i32.add
         (get_local $1)
         (i32.const -1)
        )
       )
      )
     )
    )
    (i32.store offset=1072
     (i32.const 0)
     (get_local $6)
    )
    (set_local $8
     (get_local $3)
    )
   )
   (return
    (get_local $8)
   )
  )
  (get_local $7)
 )
 (func $_Z18getBoardTextBufferv (; 16 ;) (result i32)
  (i32.const 10623040)
 )
 (func $_Z13getDataBufferv (; 17 ;) (result i32)
  (i32.const 22159424)
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
   (i32.const 20062272)
  )
 )
 (func $_Z16getLibFileBufferv (; 19 ;) (result i32)
  (i32.const 11672640)
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
     (i32.const 20062272)
    )
   )
   (i32.const 0)
  )
  (get_local $0)
 )
 (func $_Z9newCPointhh (; 21 ;) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (i32.store8
   (tee_local $3
    (i32.add
     (tee_local $2
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 20062272)
    )
   )
   (get_local $0)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (get_local $2)
    (i32.const 2)
   )
  )
  (i32.store8
   (i32.add
    (get_local $2)
    (i32.const 20062273)
   )
   (get_local $1)
  )
  (get_local $3)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 20127872)
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
     (tee_local $1
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 20062273)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 20127888)
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
   (i32.const 20062272)
  )
 )
 (func $_Z11newMoveNodeR8MoveNode (; 32 ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
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
   (tee_local $2
    (i32.add
     (get_local $1)
     (i32.const 20062272)
    )
   )
   (i32.load16_u align=1
    (get_local $0)
   )
  )
  (i32.store
   (i32.add
    (get_local $1)
    (i32.const 20062276)
   )
   (i32.load offset=4
    (get_local $0)
   )
  )
  (get_local $2)
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
     (i32.const 20062272)
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
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (set_local $10
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $3
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 8388606)
    )
   )
   (set_local $11
    (i32.const 10)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $7
        (i32.add
         (get_local $3)
         (get_local $10)
        )
       )
       (i32.const 134208)
      )
      (get_local $11)
     )
     (set_local $5
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $7)
        (i32.const 1)
       )
       (i32.const 8388606)
      )
     )
     (set_local $11
      (i32.load8_u
       (i32.add
        (get_local $10)
        (i32.const 20127904)
       )
      )
     )
     (set_local $7
      (i32.ne
       (get_local $10)
       (i32.const 11)
      )
     )
     (set_local $10
      (get_local $5)
     )
     (br_if $label$2
      (get_local $7)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $3
     (i32.add
      (get_local $3)
      (get_local $5)
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
  )
  (block $label$3
   (block $label$4
    (br_if $label$4
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $1
     (i32.load offset=20127836
      (i32.const 0)
     )
    )
    (set_local $10
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (set_local $6
     (i32.add
      (tee_local $2
       (i32.load offset=20127852
        (i32.const 0)
       )
      )
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.const 0)
    )
    (loop $label$5
     (i32.store offset=1076
      (i32.const 0)
      (tee_local $4
       (i32.add
        (get_local $10)
        (i32.const 48)
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $10)
       (i32.const 20062300)
      )
      (i32.load
       (i32.add
        (get_local $10)
        (i32.const 20062276)
       )
      )
     )
     (i32.store16 align=1
      (i32.add
       (get_local $10)
       (i32.const 20062272)
      )
      (tee_local $11
       (i32.or
        (i32.shl
         (tee_local $5
          (i32.and
           (get_local $8)
           (i32.const 15)
          )
         )
         (i32.const 8)
        )
        (get_local $5)
       )
      )
     )
     (i32.store16 align=1
      (i32.add
       (get_local $10)
       (i32.const 20062296)
      )
      (get_local $11)
     )
     (i32.store8 offset=20127856
      (i32.const 0)
      (tee_local $11
       (i32.load8_u
        (i32.add
         (i32.add
          (get_local $1)
          (get_local $5)
         )
         (i32.const -1)
        )
       )
      )
     )
     (block $label$6
      (block $label$7
       (br_if $label$7
        (i32.gt_u
         (get_local $5)
         (i32.const 6)
        )
       )
       (i32.store8 offset=20127857
        (i32.const 0)
        (i32.load8_u
         (get_local $6)
        )
       )
       (set_local $10
        (i32.const 20127859)
       )
       (set_local $7
        (i32.const 20127858)
       )
       (set_local $9
        (i32.const 6)
       )
       (br $label$6)
      )
      (set_local $10
       (i32.const 20127858)
      )
      (set_local $9
       (i32.const 16)
      )
      (set_local $7
       (i32.const 20127857)
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $2)
        (i32.sub
         (get_local $9)
         (get_local $5)
        )
       )
      )
     )
     (i32.store8
      (get_local $10)
      (i32.const 0)
     )
     (i32.store8
      (get_local $7)
      (get_local $5)
     )
     (block $label$8
      (block $label$9
       (br_if $label$9
        (i32.gt_u
         (get_local $3)
         (i32.const 8388606)
        )
       )
       (i32.store8
        (i32.add
         (get_local $3)
         (i32.const 134208)
        )
        (i32.const 10)
       )
       (block $label$10
        (br_if $label$10
         (i32.gt_u
          (tee_local $5
           (i32.add
            (get_local $3)
            (i32.const 1)
           )
          )
          (i32.const 8388606)
         )
        )
        (br_if $label$10
         (i32.eqz
          (i32.and
           (get_local $11)
           (i32.const 255)
          )
         )
        )
        (set_local $10
         (i32.const 0)
        )
        (block $label$11
         (loop $label$12
          (i32.store8
           (i32.add
            (tee_local $7
             (i32.add
              (get_local $3)
              (get_local $10)
             )
            )
            (i32.const 134209)
           )
           (get_local $11)
          )
          (set_local $5
           (i32.add
            (get_local $10)
            (i32.const 1)
           )
          )
          (br_if $label$11
           (i32.gt_u
            (i32.add
             (get_local $7)
             (i32.const 2)
            )
            (i32.const 8388606)
           )
          )
          (set_local $11
           (i32.add
            (get_local $10)
            (i32.const 20127857)
           )
          )
          (set_local $10
           (get_local $5)
          )
          (br_if $label$12
           (i32.and
            (tee_local $11
             (i32.load8_u
              (get_local $11)
             )
            )
            (i32.const 255)
           )
          )
         )
        )
        (set_local $5
         (i32.add
          (i32.add
           (get_local $3)
           (get_local $5)
          )
          (i32.const 1)
         )
        )
       )
       (i32.store offset=1060
        (i32.const 0)
        (get_local $5)
       )
       (i32.store8
        (i32.add
         (get_local $5)
         (i32.const 134208)
        )
        (i32.const 0)
       )
       (set_local $3
        (get_local $5)
       )
       (br $label$8)
      )
      (set_local $5
       (get_local $3)
      )
     )
     (set_local $10
      (get_local $4)
     )
     (br_if $label$5
      (i32.ne
       (tee_local $8
        (i32.add
         (get_local $8)
         (i32.const 1)
        )
       )
       (get_local $0)
      )
     )
     (br $label$3)
    )
   )
   (set_local $5
    (get_local $3)
   )
  )
  (block $label$13
   (br_if $label$13
    (i32.gt_u
     (get_local $5)
     (i32.const 8388606)
    )
   )
   (set_local $11
    (i32.const 10)
   )
   (set_local $10
    (i32.const 0)
   )
   (block $label$14
    (loop $label$15
     (i32.store8
      (i32.add
       (tee_local $3
        (i32.add
         (get_local $5)
         (get_local $10)
        )
       )
       (i32.const 134208)
      )
      (get_local $11)
     )
     (set_local $7
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (br_if $label$14
      (i32.gt_u
       (i32.add
        (get_local $3)
        (i32.const 1)
       )
       (i32.const 8388606)
      )
     )
     (set_local $11
      (i32.load8_u
       (i32.add
        (get_local $10)
        (i32.const 20127920)
       )
      )
     )
     (set_local $3
      (i32.ne
       (get_local $10)
       (i32.const 15)
      )
     )
     (set_local $10
      (get_local $7)
     )
     (br_if $label$15
      (get_local $3)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $10
     (i32.add
      (get_local $5)
      (get_local $7)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $10)
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
          (i32.load offset=20127948
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
         (i32.const 11672640)
         (i32.const 8388608)
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
       (i32.const 11672640)
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
       (i32.const 11672641)
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
          (i32.load offset=20127948
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
         (i32.const 11672640)
         (i32.const 8388608)
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
       (i32.const 11672640)
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
       (i32.const 11672641)
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
          (i32.load offset=20127948
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
         (i32.const 11672640)
         (i32.const 8388608)
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
       (i32.const 11672640)
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
       (i32.const 11672641)
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
       (i32.load offset=20127936
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
  (i32.store16 align=1
   (tee_local $2
    (i32.add
     (tee_local $6
      (i32.load offset=1076
       (i32.const 0)
      )
     )
     (i32.const 20062272)
    )
   )
   (i32.const 1799)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (get_local $6)
    (i32.const 48)
   )
  )
  (i32.store16 align=1
   (tee_local $0
    (i32.add
     (get_local $6)
     (i32.const 20062296)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 20127952)
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
    (i32.load offset=20127944
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 20127984)
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
    (i32.load offset=20127944
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 20128016)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 20128032)
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
     (i32.load offset=20127936
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
 (func $_Z14getBranchNodesP6CPointi (; 48 ;) (param $0 i32) (param $1 i32)
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
  (set_local $2
   (i32.rem_s
    (tee_local $7
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
    (i32.const 2)
   )
  )
  (i32.store offset=1088
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $11
   (i32.load offset=16
    (i32.load offset=20127936
     (i32.const 0)
    )
   )
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_s
      (get_local $1)
      (i32.const 0)
     )
    )
    (set_local $12
     (i32.const 1092)
    )
    (set_local $9
     (i32.const 0)
    )
    (set_local $7
     (i32.const 0)
    )
    (set_local $8
     (i32.const 0)
    )
    (set_local $4
     (i32.const 0)
    )
    (loop $label$2
     (set_local $5
      (get_local $11)
     )
     (block $label$3
      (block $label$4
       (loop $label$5
        (br_if $label$3
         (i32.eqz
          (tee_local $13
           (get_local $11)
          )
         )
        )
        (set_local $6
         (i32.shr_u
          (tee_local $11
           (i32.load16_u align=1
            (get_local $5)
           )
          )
          (i32.const 8)
         )
        )
        (set_local $3
         (i32.const 0)
        )
        (set_local $10
         (get_local $0)
        )
        (block $label$6
         (loop $label$7
          (block $label$8
           (br_if $label$8
            (i32.ne
             (i32.load8_u
              (get_local $10)
             )
             (i32.and
              (get_local $11)
              (i32.const 255)
             )
            )
           )
           (br_if $label$6
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $10)
               (i32.const 1)
              )
             )
             (get_local $6)
            )
           )
          )
          (set_local $10
           (i32.add
            (get_local $10)
            (i32.const 2)
           )
          )
          (br_if $label$7
           (i32.lt_s
            (tee_local $3
             (i32.add
              (get_local $3)
              (i32.const 1)
             )
            )
            (get_local $1)
           )
          )
         )
         (set_local $3
          (i32.const -1)
         )
        )
        (i32.store
         (i32.add
          (i32.shl
           (get_local $4)
           (i32.const 2)
          )
          (i32.const 68672)
         )
         (get_local $5)
        )
        (set_local $10
         (i32.add
          (get_local $4)
          (i32.const 1)
         )
        )
        (block $label$9
         (br_if $label$9
          (i32.eqz
           (tee_local $11
            (i32.load offset=20
             (get_local $13)
            )
           )
          )
         )
         (i32.store
          (i32.add
           (tee_local $6
            (i32.shl
             (get_local $8)
             (i32.const 3)
            )
           )
           (i32.const 69696)
          )
          (get_local $10)
         )
         (i32.store
          (i32.add
           (get_local $6)
           (i32.const 69700)
          )
          (get_local $11)
         )
         (set_local $8
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
        )
        (block $label$10
         (block $label$11
          (block $label$12
           (block $label$13
            (br_if $label$13
             (i32.ge_s
              (get_local $4)
              (get_local $1)
             )
            )
            (br_if $label$12
             (i32.le_s
              (get_local $3)
              (i32.const -1)
             )
            )
            (set_local $6
             (i32.rem_s
              (get_local $4)
              (i32.const 2)
             )
            )
            (set_local $11
             (i32.const 0)
            )
            (set_local $4
             (get_local $10)
            )
            (set_local $5
             (i32.const 0)
            )
            (br_if $label$5
             (i32.ne
              (get_local $6)
              (i32.and
               (get_local $3)
               (i32.const 1)
              )
             )
            )
            (br $label$4)
           )
           (set_local $6
            (i32.ne
             (get_local $4)
             (get_local $1)
            )
           )
           (set_local $4
            (get_local $10)
           )
           (set_local $11
            (get_local $13)
           )
           (br_if $label$5
            (get_local $6)
           )
           (set_local $6
            (get_local $7)
           )
           (br_if $label$11
            (i32.gt_s
             (get_local $3)
             (i32.const -1)
            )
           )
           (set_local $11
            (i32.const 0)
           )
           (set_local $4
            (get_local $10)
           )
           (set_local $5
            (i32.const 0)
           )
           (br_if $label$5
            (get_local $7)
           )
           (set_local $4
            (get_local $10)
           )
           (set_local $5
            (i32.const 0)
           )
           (set_local $6
            (get_local $13)
           )
           (br_if $label$11
            (i32.eq
             (get_local $3)
             (i32.const -1)
            )
           )
           (br $label$5)
          )
          (set_local $11
           (i32.const 0)
          )
          (set_local $4
           (get_local $10)
          )
          (set_local $5
           (i32.const 0)
          )
          (br_if $label$5
           (get_local $7)
          )
          (set_local $4
           (get_local $10)
          )
          (set_local $5
           (i32.const 0)
          )
          (br_if $label$5
           (i32.ne
            (get_local $3)
            (i32.const -1)
           )
          )
          (set_local $7
           (i32.const 0)
          )
          (set_local $4
           (get_local $10)
          )
          (set_local $11
           (i32.const 0)
          )
          (set_local $5
           (i32.const 0)
          )
          (br_if $label$5
           (i32.ne
            (i32.rem_s
             (get_local $10)
             (i32.const 2)
            )
            (get_local $2)
           )
          )
          (br $label$10)
         )
         (i32.store16 align=1
          (get_local $12)
          (i32.load16_u align=1
           (get_local $6)
          )
         )
         (set_local $11
          (i32.const 0)
         )
         (i32.store offset=8
          (get_local $12)
          (i32.const 0)
         )
         (i32.store offset=4
          (get_local $12)
          (i32.load offset=12
           (get_local $13)
          )
         )
         (i32.store offset=1088
          (i32.const 0)
          (i32.add
           (i32.load offset=1088
            (i32.const 0)
           )
           (i32.const 1)
          )
         )
         (set_local $12
          (i32.add
           (get_local $12)
           (i32.const 12)
          )
         )
         (set_local $4
          (get_local $10)
         )
         (set_local $5
          (i32.const 0)
         )
         (br $label$5)
        )
       )
       (set_local $11
        (i32.load offset=16
         (get_local $13)
        )
       )
       (set_local $9
        (get_local $10)
       )
       (set_local $7
        (get_local $13)
       )
       (set_local $4
        (get_local $10)
       )
       (br $label$2)
      )
      (set_local $11
       (i32.load offset=16
        (get_local $13)
       )
      )
      (set_local $4
       (get_local $10)
      )
      (br $label$2)
     )
     (br_if $label$0
      (i32.lt_s
       (get_local $8)
       (i32.const 1)
      )
     )
     (set_local $9
      (select
       (get_local $9)
       (i32.const 0)
       (tee_local $11
        (i32.or
         (i32.eqz
          (get_local $7)
         )
         (i32.lt_s
          (get_local $9)
          (tee_local $3
           (i32.load
            (i32.add
             (tee_local $10
              (i32.shl
               (tee_local $8
                (i32.add
                 (get_local $8)
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
     (set_local $7
      (select
       (get_local $7)
       (i32.const 0)
       (get_local $11)
      )
     )
     (set_local $4
      (i32.add
       (get_local $3)
       (i32.const -1)
      )
     )
     (set_local $11
      (i32.load
       (i32.add
        (get_local $10)
        (i32.const 69700)
       )
      )
     )
     (br $label$2)
    )
   )
   (set_local $0
    (i32.const 1092)
   )
   (set_local $12
    (i32.const 0)
   )
   (set_local $9
    (i32.const 0)
   )
   (set_local $4
    (i32.const 0)
   )
   (set_local $10
    (i32.const 0)
   )
   (loop $label$14
    (set_local $13
     (get_local $11)
    )
    (block $label$15
     (loop $label$16
      (set_local $6
       (get_local $11)
      )
      (block $label$17
       (loop $label$18
        (set_local $11
         (i32.add
          (i32.shl
           (get_local $10)
           (i32.const 2)
          )
          (i32.const 68672)
         )
        )
        (block $label$19
         (block $label$20
          (block $label$21
           (loop $label$22
            (set_local $3
             (get_local $10)
            )
            (br_if $label$15
             (i32.eqz
              (get_local $6)
             )
            )
            (i32.store
             (get_local $11)
             (get_local $13)
            )
            (set_local $10
             (i32.add
              (get_local $3)
              (i32.const 1)
             )
            )
            (block $label$23
             (br_if $label$23
              (i32.eqz
               (tee_local $5
                (i32.load
                 (i32.add
                  (get_local $6)
                  (i32.const 20)
                 )
                )
               )
              )
             )
             (i32.store
              (i32.add
               (tee_local $8
                (i32.shl
                 (get_local $4)
                 (i32.const 3)
                )
               )
               (i32.const 69696)
              )
              (get_local $10)
             )
             (i32.store
              (i32.add
               (get_local $8)
               (i32.const 69700)
              )
              (get_local $5)
             )
             (set_local $4
              (i32.add
               (get_local $4)
               (i32.const 1)
              )
             )
            )
            (block $label$24
             (br_if $label$24
              (i32.lt_s
               (get_local $3)
               (get_local $1)
              )
             )
             (set_local $11
              (i32.add
               (get_local $11)
               (i32.const 4)
              )
             )
             (br_if $label$22
              (i32.ne
               (get_local $7)
               (get_local $10)
              )
             )
             (br $label$21)
            )
           )
           (br_if $label$17
            (i32.eqz
             (get_local $9)
            )
           )
           (br $label$20)
          )
          (br_if $label$19
           (i32.eqz
            (get_local $9)
           )
          )
         )
         (set_local $10
          (i32.add
           (get_local $3)
           (i32.const 1)
          )
         )
         (set_local $6
          (i32.const 0)
         )
         (set_local $13
          (i32.const 0)
         )
         (br $label$18)
        )
       )
       (i32.store16 align=1
        (get_local $0)
        (i32.load16_u align=1
         (get_local $6)
        )
       )
       (set_local $9
        (i32.const 0)
       )
       (i32.store offset=8
        (get_local $0)
        (i32.const 0)
       )
       (i32.store offset=4
        (get_local $0)
        (i32.load offset=12
         (get_local $6)
        )
       )
       (i32.store offset=1088
        (i32.const 0)
        (i32.add
         (i32.load offset=1088
          (i32.const 0)
         )
         (i32.const 1)
        )
       )
       (set_local $0
        (i32.add
         (get_local $0)
         (i32.const 12)
        )
       )
       (set_local $11
        (i32.const 0)
       )
       (set_local $13
        (i32.const 0)
       )
       (br $label$16)
      )
      (set_local $9
       (i32.const 0)
      )
      (set_local $11
       (i32.const 0)
      )
      (set_local $13
       (i32.const 0)
      )
      (br_if $label$16
       (i32.ne
        (i32.rem_s
         (tee_local $10
          (i32.add
           (get_local $3)
           (i32.const 1)
          )
         )
         (i32.const 2)
        )
        (get_local $2)
       )
      )
     )
     (set_local $9
      (get_local $6)
     )
     (set_local $10
      (tee_local $12
       (i32.add
        (get_local $3)
        (i32.const 1)
       )
      )
     )
     (set_local $11
      (i32.load
       (i32.add
        (get_local $6)
        (i32.const 16)
       )
      )
     )
     (br $label$14)
    )
    (br_if $label$0
     (i32.lt_s
      (get_local $4)
      (i32.const 1)
     )
    )
    (set_local $12
     (select
      (get_local $12)
      (i32.const 0)
      (tee_local $11
       (i32.or
        (i32.eqz
         (get_local $9)
        )
        (i32.lt_s
         (get_local $12)
         (tee_local $10
          (i32.load
           (i32.add
            (tee_local $3
             (i32.shl
              (tee_local $4
               (i32.add
                (get_local $4)
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
    (set_local $9
     (select
      (get_local $9)
      (i32.const 0)
      (get_local $11)
     )
    )
    (set_local $10
     (i32.add
      (get_local $10)
      (i32.const -1)
     )
    )
    (set_local $11
     (i32.load
      (i32.add
       (get_local $3)
       (i32.const 69700)
      )
     )
    )
    (br $label$14)
   )
  )
 )
 (func $_Z12checkVersionv (; 49 ;) (result i32)
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
   (i32.load offset=20127948
    (i32.const 0)
   )
  )
  (set_local $1
   (call $_Z9getBufferPhj
    (i32.const 11672640)
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
     (i32.const 8388606)
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
       (i32.const 8388606)
      )
     )
     (set_local $6
      (i32.load8_u
       (i32.add
        (get_local $5)
        (i32.const 20128176)
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
           (i32.const 11672640)
          )
         )
         (i32.load8_u
          (i32.add
           (get_local $5)
           (i32.const 20128144)
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
       (i32.load8_u offset=11672648
        (i32.const 0)
       )
      )
     )
     (i32.store8 offset=13
      (get_local $0)
      (tee_local $6
       (i32.load8_u offset=11672649
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
      (i32.load8_u offset=11672640
       (i32.const 0)
      )
      (i32.const 120)
     )
    )
   )
   (i32.store offset=904
    (tee_local $5
     (call $memset
      (i32.load offset=20127944
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
     (i32.load offset=20127940
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
       (get_local $6)
       (i32.const 20062296)
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
   (i32.store offset=20127936
    (i32.const 0)
    (get_local $6)
   )
   (return
    (i32.const 1)
   )
  )
  (get_local $7)
 )
 (func $_Z15loadAllMoveNodev (; 50 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (i32.store offset=1076
   (i32.const 0)
   (i32.add
    (tee_local $7
     (i32.load offset=1076
      (i32.const 0)
     )
    )
    (i32.const 24)
   )
  )
  (i32.store offset=20128056
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $2
   (call $_ZN11LibraryFile3GetER8MoveNode
    (i32.load offset=20127948
     (i32.const 0)
    )
    (tee_local $5
     (i32.add
      (get_local $7)
      (i32.const 20062272)
     )
    )
   )
  )
  (set_local $7
   (i32.load offset=20128056
    (i32.const 0)
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (get_local $2)
    )
   )
   (loop $label$1
    (i32.store offset=20128056
     (i32.const 0)
     (i32.add
      (get_local $7)
      (i32.const 1)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (i32.and
        (tee_local $7
         (i32.load offset=4
          (get_local $5)
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
          (tee_local $7
           (i32.load
            (tee_local $2
             (i32.load offset=20127948
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
        (block $label$6
         (br_if $label$6
          (tee_local $6
           (call $_Z9getBufferPhj
            (i32.const 11672640)
            (i32.const 8388608)
           )
          )
         )
         (set_local $6
          (i32.const 0)
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$4)
        )
        (set_local $7
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
         (get_local $7)
         (i32.const 1)
        )
       )
       (set_local $6
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672640)
         )
        )
       )
       (i32.store
        (get_local $2)
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
       )
       (set_local $7
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672641)
         )
        )
       )
      )
      (br_if $label$3
       (i32.gt_s
        (i32.shr_s
         (i32.shl
          (i32.or
           (get_local $7)
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
     (set_local $7
      (i32.load
       (i32.add
        (get_local $5)
        (i32.const 4)
       )
      )
     )
    )
    (block $label$7
     (br_if $label$7
      (i32.eqz
       (i32.and
        (get_local $7)
        (i32.const 8)
       )
      )
     )
     (set_local $6
      (i32.const 0)
     )
     (set_local $1
      (i32.add
       (tee_local $0
        (i32.load offset=1068
         (i32.const 0)
        )
       )
       (i32.const 9573440)
      )
     )
     (loop $label$8
      (block $label$9
       (block $label$10
        (br_if $label$10
         (i32.lt_s
          (tee_local $7
           (i32.load
            (tee_local $2
             (i32.load offset=20127948
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
        (block $label$11
         (br_if $label$11
          (tee_local $8
           (call $_Z9getBufferPhj
            (i32.const 11672640)
            (i32.const 8388608)
           )
          )
         )
         (set_local $8
          (i32.const 0)
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$9)
        )
        (set_local $7
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
          (get_local $8)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $2)
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (set_local $8
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672640)
         )
        )
       )
       (i32.store
        (get_local $2)
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
       )
       (set_local $7
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672641)
         )
        )
       )
      )
      (block $label$12
       (i32.store8
        (tee_local $2
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (get_local $8)
       )
       (i32.store8
        (i32.add
         (get_local $2)
         (i32.const 1)
        )
        (get_local $7)
       )
       (set_local $6
        (i32.add
         (get_local $6)
         (i32.const 2)
        )
       )
       (br_if $label$12
        (i32.eqz
         (i32.and
          (get_local $8)
          (i32.const 255)
         )
        )
       )
       (br_if $label$8
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
       )
      )
     )
     (block $label$13
      (block $label$14
       (block $label$15
        (block $label$16
         (br_if $label$16
          (i32.le_u
           (i32.add
            (tee_local $4
             (i32.sub
              (tee_local $9
               (i32.add
                (tee_local $3
                 (i32.load offset=1068
                  (i32.const 0)
                 )
                )
                (i32.const 9573440)
               )
              )
              (get_local $6)
             )
            )
            (i32.const 1)
           )
           (i32.const 9573440)
          )
         )
         (set_local $7
          (i32.const 9573440)
         )
         (set_local $8
          (i32.add
           (get_local $0)
           (i32.const 9573440)
          )
         )
         (loop $label$17
          (set_local $2
           (i32.const 0)
          )
          (block $label$18
           (loop $label$19
            (br_if $label$18
             (i32.ne
              (tee_local $1
               (i32.load8_u
                (i32.add
                 (get_local $7)
                 (get_local $2)
                )
               )
              )
              (i32.load8_u
               (i32.add
                (get_local $8)
                (get_local $2)
               )
              )
             )
            )
            (br_if $label$19
             (i32.lt_u
              (tee_local $2
               (i32.add
                (get_local $2)
                (i32.const 1)
               )
              )
              (get_local $6)
             )
            )
            (br $label$15)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eqz
             (get_local $1)
            )
           )
           (loop $label$21
            (br_if $label$21
             (i32.load8_u
              (tee_local $7
               (i32.add
                (get_local $7)
                (i32.const 1)
               )
              )
             )
            )
           )
          )
          (loop $label$22
           (br_if $label$22
            (i32.eqz
             (i32.load8_u
              (tee_local $7
               (i32.add
                (get_local $7)
                (i32.const 1)
               )
              )
             )
            )
           )
          )
          (br_if $label$17
           (i32.lt_u
            (i32.add
             (get_local $7)
             (i32.const -1)
            )
            (get_local $4)
           )
          )
         )
        )
        (i32.store offset=8
         (get_local $5)
         (get_local $9)
        )
        (i32.store offset=1068
         (i32.const 0)
         (i32.add
          (get_local $3)
          (get_local $6)
         )
        )
        (br_if $label$14
         (get_local $9)
        )
        (set_local $7
         (i32.and
          (i32.load
           (i32.add
            (get_local $5)
            (i32.const 4)
           )
          )
          (i32.const -41)
         )
        )
        (br $label$13)
       )
       (i32.store offset=8
        (get_local $5)
        (get_local $7)
       )
       (set_local $9
        (get_local $7)
       )
      )
      (set_local $7
       (select
        (i32.or
         (tee_local $7
          (i32.load
           (i32.add
            (get_local $5)
            (i32.const 4)
           )
          )
         )
         (i32.const 8)
        )
        (i32.and
         (get_local $7)
         (i32.const -41)
        )
        (i32.load8_u
         (get_local $9)
        )
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $5)
       (i32.const 4)
      )
      (tee_local $7
       (i32.and
        (get_local $7)
        (i32.const -33)
       )
      )
     )
    )
    (block $label$23
     (br_if $label$23
      (i32.eqz
       (i32.and
        (get_local $7)
        (i32.const 256)
       )
      )
     )
     (set_local $6
      (i32.const 0)
     )
     (set_local $1
      (i32.add
       (tee_local $0
        (i32.load offset=1072
         (i32.const 0)
        )
       )
       (i32.const 10623040)
      )
     )
     (loop $label$24
      (block $label$25
       (block $label$26
        (br_if $label$26
         (i32.lt_s
          (tee_local $7
           (i32.load
            (tee_local $2
             (i32.load offset=20127948
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
          (tee_local $8
           (call $_Z9getBufferPhj
            (i32.const 11672640)
            (i32.const 8388608)
           )
          )
         )
         (set_local $8
          (i32.const 0)
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$25)
        )
        (set_local $7
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
          (get_local $8)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $2)
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (set_local $8
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672640)
         )
        )
       )
       (i32.store
        (get_local $2)
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
       )
       (set_local $7
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672641)
         )
        )
       )
      )
      (block $label$28
       (i32.store8
        (tee_local $2
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (get_local $8)
       )
       (i32.store8
        (i32.add
         (get_local $2)
         (i32.const 1)
        )
        (get_local $7)
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
          (get_local $8)
          (i32.const 255)
         )
        )
       )
       (br_if $label$24
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
       )
      )
     )
     (block $label$29
      (block $label$30
       (block $label$31
        (block $label$32
         (br_if $label$32
          (i32.le_u
           (i32.add
            (tee_local $4
             (i32.sub
              (tee_local $9
               (i32.add
                (tee_local $3
                 (i32.load offset=1072
                  (i32.const 0)
                 )
                )
                (i32.const 10623040)
               )
              )
              (get_local $6)
             )
            )
            (i32.const 1)
           )
           (i32.const 10623040)
          )
         )
         (set_local $7
          (i32.const 10623040)
         )
         (set_local $8
          (i32.add
           (get_local $0)
           (i32.const 10623040)
          )
         )
         (loop $label$33
          (set_local $2
           (i32.const 0)
          )
          (block $label$34
           (loop $label$35
            (br_if $label$34
             (i32.ne
              (tee_local $1
               (i32.load8_u
                (i32.add
                 (get_local $7)
                 (get_local $2)
                )
               )
              )
              (i32.load8_u
               (i32.add
                (get_local $8)
                (get_local $2)
               )
              )
             )
            )
            (br_if $label$35
             (i32.lt_u
              (tee_local $2
               (i32.add
                (get_local $2)
                (i32.const 1)
               )
              )
              (get_local $6)
             )
            )
            (br $label$31)
           )
          )
          (block $label$36
           (br_if $label$36
            (i32.eqz
             (get_local $1)
            )
           )
           (loop $label$37
            (br_if $label$37
             (i32.load8_u
              (tee_local $7
               (i32.add
                (get_local $7)
                (i32.const 1)
               )
              )
             )
            )
           )
          )
          (loop $label$38
           (br_if $label$38
            (i32.eqz
             (i32.load8_u
              (tee_local $7
               (i32.add
                (get_local $7)
                (i32.const 1)
               )
              )
             )
            )
           )
          )
          (br_if $label$33
           (i32.lt_u
            (i32.add
             (get_local $7)
             (i32.const -1)
            )
            (get_local $4)
           )
          )
         )
        )
        (i32.store offset=12
         (get_local $5)
         (get_local $9)
        )
        (i32.store offset=1072
         (i32.const 0)
         (i32.add
          (get_local $3)
          (get_local $6)
         )
        )
        (br_if $label$30
         (get_local $9)
        )
        (set_local $7
         (i32.and
          (i32.load
           (i32.add
            (get_local $5)
            (i32.const 4)
           )
          )
          (i32.const -257)
         )
        )
        (br $label$29)
       )
       (i32.store offset=12
        (get_local $5)
        (get_local $7)
       )
       (set_local $9
        (get_local $7)
       )
      )
      (set_local $7
       (select
        (i32.or
         (tee_local $7
          (i32.load
           (i32.add
            (get_local $5)
            (i32.const 4)
           )
          )
         )
         (i32.const 256)
        )
        (i32.and
         (get_local $7)
         (i32.const -257)
        )
        (i32.load8_u
         (get_local $9)
        )
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $5)
       (i32.const 4)
      )
      (select
       (i32.or
        (get_local $7)
        (i32.const 1)
       )
       (i32.and
        (get_local $7)
        (i32.const -2)
       )
       (i32.and
        (get_local $7)
        (i32.const 16776960)
       )
      )
     )
    )
    (i32.store offset=1076
     (i32.const 0)
     (i32.add
      (tee_local $7
       (i32.load offset=1076
        (i32.const 0)
       )
      )
      (i32.const 24)
     )
    )
    (set_local $2
     (call $_ZN11LibraryFile3GetER8MoveNode
      (i32.load offset=20127948
       (i32.const 0)
      )
      (tee_local $5
       (i32.add
        (get_local $7)
        (i32.const 20062272)
       )
      )
     )
    )
    (set_local $7
     (i32.load offset=20128056
      (i32.const 0)
     )
    )
    (br_if $label$1
     (get_local $2)
    )
   )
  )
  (get_local $7)
 )
 (func $_ZN11LibraryFile3GetER8MoveNode (; 51 ;) (param $0 i32) (param $1 i32) (result i32)
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
        (i32.const 11672640)
        (i32.const 8388608)
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
      (i32.const 11672640)
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
      (i32.const 11672641)
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
          (i32.const 11672640)
          (i32.const 8388608)
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
        (i32.const 11672640)
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
        (i32.const 11672641)
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
 (func $_Z15createRenjuTreev (; 52 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store offset=904
   (i32.load offset=20127944
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
      (i32.load offset=20128056
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
     (i32.load offset=20127936
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
       (i32.const 1000000)
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
       (i32.load offset=20127944
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
         (i32.load offset=20127944
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
        (i32.load offset=20127940
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
            (i32.load offset=20127940
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
         (i32.load offset=20127944
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
        (i32.load offset=20127944
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
       (i32.load offset=20128056
        (i32.const 0)
       )
      )
     )
    )
   )
  )
  (get_local $5)
 )
 (func $_Z10addLibraryv (; 53 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
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
  (set_local $9
   (i32.load offset=20127936
    (i32.const 0)
   )
  )
  (set_local $7
   (i32.const -1)
  )
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (call $_Z12checkVersionv)
    )
   )
   (i32.store offset=20128056
    (i32.const 0)
    (i32.const 0)
   )
   (set_local $1
    (call $_ZN11LibraryFile3GetER8MoveNode
     (i32.load offset=20127948
      (i32.const 0)
     )
     (tee_local $0
      (i32.add
       (get_local $1)
       (i32.const 20062272)
      )
     )
    )
   )
   (set_local $7
    (i32.load offset=20128056
     (i32.const 0)
    )
   )
   (br_if $label$0
    (i32.eqz
     (get_local $1)
    )
   )
   (set_local $6
    (get_local $0)
   )
   (loop $label$1
    (i32.store offset=20128056
     (i32.const 0)
     (i32.add
      (get_local $7)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.shr_u
      (tee_local $1
       (i32.load16_u align=1
        (get_local $6)
       )
      )
      (i32.const 8)
     )
    )
    (block $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (block $label$7
          (block $label$8
           (br_if $label$8
            (i32.eqz
             (tee_local $1
              (i32.and
               (get_local $1)
               (i32.const 255)
              )
             )
            )
           )
           (br_if $label$5
            (i32.gt_u
             (get_local $1)
             (i32.const 15)
            )
           )
           (br_if $label$5
            (i32.gt_u
             (i32.and
              (i32.add
               (get_local $8)
               (i32.const -1)
              )
              (i32.const 255)
             )
             (i32.const 14)
            )
           )
           (br_if $label$6
            (i32.eqz
             (tee_local $7
              (i32.load offset=16
               (get_local $9)
              )
             )
            )
           )
           (br_if $label$7
            (i32.ne
             (i32.load8_u
              (get_local $7)
             )
             (get_local $1)
            )
           )
           (br_if $label$7
            (i32.ne
             (i32.load8_u offset=1
              (get_local $7)
             )
             (get_local $8)
            )
           )
           (set_local $0
            (get_local $7)
           )
           (br $label$3)
          )
          (set_local $0
           (get_local $9)
          )
          (br_if $label$2
           (i32.eqz
            (get_local $8)
           )
          )
          (br $label$5)
         )
         (br_if $label$6
          (i32.eqz
           (tee_local $7
            (i32.load offset=20
             (get_local $7)
            )
           )
          )
         )
         (loop $label$9
          (block $label$10
           (br_if $label$10
            (i32.ne
             (i32.load8_u
              (get_local $7)
             )
             (get_local $1)
            )
           )
           (br_if $label$4
            (i32.eq
             (i32.load8_u offset=1
              (get_local $7)
             )
             (get_local $8)
            )
           )
          )
          (br_if $label$9
           (tee_local $7
            (i32.load offset=20
             (get_local $7)
            )
           )
          )
         )
        )
        (call $_Z7addMoveP8MoveNodeS0_
         (get_local $9)
         (get_local $0)
        )
        (br $label$3)
       )
       (return
        (i32.xor
         (get_local $7)
         (i32.const -1)
        )
       )
      )
      (set_local $0
       (get_local $7)
      )
     )
     (i32.store offset=904
      (tee_local $7
       (i32.load offset=20127944
        (i32.const 0)
       )
      )
      (tee_local $1
       (i32.add
        (i32.load offset=904
         (get_local $7)
        )
        (i32.const 1)
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $7)
       (i32.shl
        (get_local $1)
        (i32.const 2)
       )
      )
      (get_local $0)
     )
    )
    (block $label$11
     (br_if $label$11
      (i32.eqz
       (i32.and
        (tee_local $7
         (i32.load offset=4
          (get_local $6)
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
     (loop $label$12
      (block $label$13
       (block $label$14
        (br_if $label$14
         (i32.lt_s
          (tee_local $7
           (i32.load
            (tee_local $1
             (i32.load offset=20127948
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
        (block $label$15
         (br_if $label$15
          (tee_local $8
           (call $_Z9getBufferPhj
            (i32.const 11672640)
            (i32.const 8388608)
           )
          )
         )
         (set_local $8
          (i32.const 0)
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$13)
        )
        (set_local $7
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
          (get_local $8)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $1)
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (set_local $8
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672640)
         )
        )
       )
       (i32.store
        (get_local $1)
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
       )
       (set_local $7
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672641)
         )
        )
       )
      )
      (br_if $label$12
       (i32.gt_s
        (i32.shr_s
         (i32.shl
          (i32.or
           (get_local $7)
           (get_local $8)
          )
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const -1)
       )
      )
     )
     (set_local $7
      (i32.load
       (i32.add
        (get_local $6)
        (i32.const 4)
       )
      )
     )
    )
    (block $label$16
     (br_if $label$16
      (i32.eqz
       (i32.and
        (get_local $7)
        (i32.const 8)
       )
      )
     )
     (set_local $8
      (i32.const 0)
     )
     (set_local $3
      (i32.add
       (tee_local $2
        (i32.load offset=1068
         (i32.const 0)
        )
       )
       (i32.const 9573440)
      )
     )
     (loop $label$17
      (block $label$18
       (block $label$19
        (br_if $label$19
         (i32.lt_s
          (tee_local $7
           (i32.load
            (tee_local $1
             (i32.load offset=20127948
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
        (block $label$20
         (br_if $label$20
          (tee_local $9
           (call $_Z9getBufferPhj
            (i32.const 11672640)
            (i32.const 8388608)
           )
          )
         )
         (set_local $9
          (i32.const 0)
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$18)
        )
        (set_local $7
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
          (get_local $9)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $1)
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (set_local $9
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672640)
         )
        )
       )
       (i32.store
        (get_local $1)
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
       )
       (set_local $7
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672641)
         )
        )
       )
      )
      (block $label$21
       (i32.store8
        (tee_local $1
         (i32.add
          (get_local $3)
          (get_local $8)
         )
        )
        (get_local $9)
       )
       (i32.store8
        (i32.add
         (get_local $1)
         (i32.const 1)
        )
        (get_local $7)
       )
       (set_local $8
        (i32.add
         (get_local $8)
         (i32.const 2)
        )
       )
       (br_if $label$21
        (i32.eqz
         (i32.and
          (get_local $9)
          (i32.const 255)
         )
        )
       )
       (br_if $label$17
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
       )
      )
     )
     (block $label$22
      (block $label$23
       (block $label$24
        (br_if $label$24
         (i32.le_u
          (i32.add
           (tee_local $5
            (i32.sub
             (tee_local $10
              (i32.add
               (tee_local $4
                (i32.load offset=1068
                 (i32.const 0)
                )
               )
               (i32.const 9573440)
              )
             )
             (get_local $8)
            )
           )
           (i32.const 1)
          )
          (i32.const 9573440)
         )
        )
        (set_local $7
         (i32.const 9573440)
        )
        (set_local $9
         (i32.add
          (get_local $2)
          (i32.const 9573440)
         )
        )
        (loop $label$25
         (set_local $1
          (i32.const 0)
         )
         (block $label$26
          (loop $label$27
           (br_if $label$26
            (i32.ne
             (tee_local $3
              (i32.load8_u
               (i32.add
                (get_local $7)
                (get_local $1)
               )
              )
             )
             (i32.load8_u
              (i32.add
               (get_local $9)
               (get_local $1)
              )
             )
            )
           )
           (br_if $label$27
            (i32.lt_u
             (tee_local $1
              (i32.add
               (get_local $1)
               (i32.const 1)
              )
             )
             (get_local $8)
            )
           )
           (br $label$23)
          )
         )
         (block $label$28
          (br_if $label$28
           (i32.eqz
            (get_local $3)
           )
          )
          (loop $label$29
           (br_if $label$29
            (i32.load8_u
             (tee_local $7
              (i32.add
               (get_local $7)
               (i32.const 1)
              )
             )
            )
           )
          )
         )
         (loop $label$30
          (br_if $label$30
           (i32.eqz
            (i32.load8_u
             (tee_local $7
              (i32.add
               (get_local $7)
               (i32.const 1)
              )
             )
            )
           )
          )
         )
         (br_if $label$25
          (i32.lt_u
           (i32.add
            (get_local $7)
            (i32.const -1)
           )
           (get_local $5)
          )
         )
        )
       )
       (i32.store offset=1068
        (i32.const 0)
        (i32.add
         (get_local $4)
         (get_local $8)
        )
       )
       (br_if $label$16
        (i32.load offset=8
         (get_local $0)
        )
       )
       (br $label$22)
      )
      (set_local $10
       (get_local $7)
      )
      (br_if $label$16
       (i32.load offset=8
        (get_local $0)
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $0)
       (i32.const 8)
      )
      (get_local $10)
     )
     (block $label$31
      (block $label$32
       (br_if $label$32
        (i32.eqz
         (get_local $10)
        )
       )
       (set_local $7
        (select
         (i32.or
          (tee_local $7
           (i32.load offset=4
            (get_local $0)
           )
          )
          (i32.const 8)
         )
         (i32.and
          (get_local $7)
          (i32.const -41)
         )
         (i32.load8_u
          (get_local $10)
         )
        )
       )
       (set_local $1
        (i32.add
         (get_local $0)
         (i32.const 4)
        )
       )
       (br $label$31)
      )
      (set_local $1
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
      )
      (set_local $7
       (i32.and
        (i32.load offset=4
         (get_local $0)
        )
        (i32.const -41)
       )
      )
     )
     (i32.store
      (get_local $1)
      (i32.and
       (get_local $7)
       (i32.const -33)
      )
     )
    )
    (block $label$33
     (br_if $label$33
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $6)
          (i32.const 5)
         )
        )
        (i32.const 1)
       )
      )
     )
     (set_local $8
      (i32.const 0)
     )
     (set_local $3
      (i32.add
       (tee_local $2
        (i32.load offset=1072
         (i32.const 0)
        )
       )
       (i32.const 10623040)
      )
     )
     (loop $label$34
      (block $label$35
       (block $label$36
        (br_if $label$36
         (i32.lt_s
          (tee_local $7
           (i32.load
            (tee_local $1
             (i32.load offset=20127948
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
        (block $label$37
         (br_if $label$37
          (tee_local $9
           (call $_Z9getBufferPhj
            (i32.const 11672640)
            (i32.const 8388608)
           )
          )
         )
         (set_local $9
          (i32.const 0)
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$35)
        )
        (set_local $7
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
          (get_local $9)
          (i32.const -1)
         )
        )
       )
       (i32.store
        (get_local $1)
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (set_local $9
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672640)
         )
        )
       )
       (i32.store
        (get_local $1)
        (i32.add
         (get_local $7)
         (i32.const 2)
        )
       )
       (set_local $7
        (i32.load8_u
         (i32.add
          (get_local $7)
          (i32.const 11672641)
         )
        )
       )
      )
      (block $label$38
       (i32.store8
        (tee_local $1
         (i32.add
          (get_local $3)
          (get_local $8)
         )
        )
        (get_local $9)
       )
       (i32.store8
        (i32.add
         (get_local $1)
         (i32.const 1)
        )
        (get_local $7)
       )
       (set_local $8
        (i32.add
         (get_local $8)
         (i32.const 2)
        )
       )
       (br_if $label$38
        (i32.eqz
         (i32.and
          (get_local $9)
          (i32.const 255)
         )
        )
       )
       (br_if $label$34
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
       )
      )
     )
     (block $label$39
      (block $label$40
       (block $label$41
        (br_if $label$41
         (i32.le_u
          (i32.add
           (tee_local $5
            (i32.sub
             (tee_local $10
              (i32.add
               (tee_local $4
                (i32.load offset=1072
                 (i32.const 0)
                )
               )
               (i32.const 10623040)
              )
             )
             (get_local $8)
            )
           )
           (i32.const 1)
          )
          (i32.const 10623040)
         )
        )
        (set_local $7
         (i32.const 10623040)
        )
        (set_local $9
         (i32.add
          (get_local $2)
          (i32.const 10623040)
         )
        )
        (loop $label$42
         (set_local $1
          (i32.const 0)
         )
         (block $label$43
          (loop $label$44
           (br_if $label$43
            (i32.ne
             (tee_local $3
              (i32.load8_u
               (i32.add
                (get_local $7)
                (get_local $1)
               )
              )
             )
             (i32.load8_u
              (i32.add
               (get_local $9)
               (get_local $1)
              )
             )
            )
           )
           (br_if $label$44
            (i32.lt_u
             (tee_local $1
              (i32.add
               (get_local $1)
               (i32.const 1)
              )
             )
             (get_local $8)
            )
           )
           (br $label$40)
          )
         )
         (block $label$45
          (br_if $label$45
           (i32.eqz
            (get_local $3)
           )
          )
          (loop $label$46
           (br_if $label$46
            (i32.load8_u
             (tee_local $7
              (i32.add
               (get_local $7)
               (i32.const 1)
              )
             )
            )
           )
          )
         )
         (loop $label$47
          (br_if $label$47
           (i32.eqz
            (i32.load8_u
             (tee_local $7
              (i32.add
               (get_local $7)
               (i32.const 1)
              )
             )
            )
           )
          )
         )
         (br_if $label$42
          (i32.lt_u
           (i32.add
            (get_local $7)
            (i32.const -1)
           )
           (get_local $5)
          )
         )
        )
       )
       (i32.store offset=1072
        (i32.const 0)
        (i32.add
         (get_local $4)
         (get_local $8)
        )
       )
       (br_if $label$33
        (i32.load offset=12
         (get_local $0)
        )
       )
       (br $label$39)
      )
      (set_local $10
       (get_local $7)
      )
      (br_if $label$33
       (i32.load offset=12
        (get_local $0)
       )
      )
     )
     (i32.store
      (i32.add
       (get_local $0)
       (i32.const 12)
      )
      (get_local $10)
     )
     (block $label$48
      (block $label$49
       (br_if $label$49
        (i32.eqz
         (get_local $10)
        )
       )
       (set_local $7
        (select
         (i32.or
          (tee_local $7
           (i32.load offset=4
            (get_local $0)
           )
          )
          (i32.const 256)
         )
         (i32.and
          (get_local $7)
          (i32.const -257)
         )
         (i32.load8_u
          (get_local $10)
         )
        )
       )
       (set_local $1
        (i32.add
         (get_local $0)
         (i32.const 4)
        )
       )
       (br $label$48)
      )
      (set_local $1
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
      )
      (set_local $7
       (i32.and
        (i32.load offset=4
         (get_local $0)
        )
        (i32.const -257)
       )
      )
     )
     (i32.store
      (get_local $1)
      (select
       (i32.or
        (get_local $7)
        (i32.const 1)
       )
       (i32.and
        (get_local $7)
        (i32.const -2)
       )
       (i32.and
        (get_local $7)
        (i32.const 16776960)
       )
      )
     )
    )
    (block $label$50
     (block $label$51
      (block $label$52
       (block $label$53
        (block $label$54
         (block $label$55
          (block $label$56
           (block $label$57
            (block $label$58
             (block $label$59
              (br_if $label$59
               (i32.eqz
                (i32.and
                 (tee_local $7
                  (i32.load
                   (tee_local $1
                    (i32.add
                     (get_local $6)
                     (i32.const 4)
                    )
                   )
                  )
                 )
                 (i32.const 16)
                )
               )
              )
              (br_if $label$58
               (i32.eqz
                (i32.and
                 (tee_local $8
                  (i32.load offset=4
                   (get_local $0)
                  )
                 )
                 (i32.const 16)
                )
               )
              )
             )
             (br_if $label$57
              (i32.eqz
               (i32.and
                (get_local $7)
                (i32.const 2)
               )
              )
             )
             (br $label$56)
            )
            (i32.store
             (i32.add
              (get_local $0)
              (i32.const 4)
             )
             (i32.or
              (get_local $8)
              (i32.const 16)
             )
            )
            (br_if $label$56
             (i32.and
              (tee_local $7
               (i32.load
                (get_local $1)
               )
              )
              (i32.const 2)
             )
            )
           )
           (br_if $label$55
            (i32.and
             (tee_local $8
              (i32.load offset=4
               (get_local $0)
              )
             )
             (i32.const 2)
            )
           )
          )
          (br_if $label$54
           (i32.and
            (get_local $7)
            (i32.const 4)
           )
          )
          (br $label$53)
         )
         (i32.store
          (i32.add
           (get_local $0)
           (i32.const 4)
          )
          (i32.and
           (get_local $8)
           (i32.const -3)
          )
         )
         (br_if $label$53
          (i32.eqz
           (i32.and
            (tee_local $7
             (i32.load
              (get_local $1)
             )
            )
            (i32.const 4)
           )
          )
         )
        )
        (br_if $label$52
         (i32.eqz
          (i32.and
           (tee_local $8
            (i32.load offset=4
             (get_local $0)
            )
           )
           (i32.const 4)
          )
         )
        )
       )
       (br_if $label$51
        (i32.and
         (get_local $7)
         (i32.const 128)
        )
       )
       (br $label$50)
      )
      (i32.store
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
       (i32.or
        (get_local $8)
        (i32.const 4)
       )
      )
      (br_if $label$50
       (i32.eqz
        (i32.and
         (tee_local $7
          (i32.load
           (get_local $1)
          )
         )
         (i32.const 128)
        )
       )
      )
     )
     (br_if $label$50
      (i32.lt_s
       (tee_local $8
        (i32.load offset=904
         (i32.load offset=20127944
          (i32.const 0)
         )
        )
       )
       (i32.const 1)
      )
     )
     (i32.store
      (i32.add
       (tee_local $1
        (i32.load offset=20127940
         (i32.const 0)
        )
       )
       (i32.shl
        (i32.load offset=1800
         (get_local $1)
        )
        (i32.const 3)
       )
      )
      (get_local $8)
     )
     (i32.store offset=1800
      (get_local $1)
      (i32.add
       (tee_local $8
        (i32.load offset=1800
         (get_local $1)
        )
       )
       (i32.const 1)
      )
     )
     (i32.store offset=4
      (i32.add
       (get_local $1)
       (i32.shl
        (get_local $8)
        (i32.const 3)
       )
      )
      (i32.const 0)
     )
    )
    (block $label$60
     (br_if $label$60
      (i32.eqz
       (i32.and
        (get_local $7)
        (i32.const 64)
       )
      )
     )
     (block $label$61
      (block $label$62
       (br_if $label$62
        (i32.eqz
         (tee_local $1
          (i32.load offset=1800
           (tee_local $7
            (i32.load offset=20127940
             (i32.const 0)
            )
           )
          )
         )
        )
       )
       (i32.store
        (i32.add
         (get_local $7)
         (i32.const 1800)
        )
        (tee_local $1
         (i32.add
          (get_local $1)
          (i32.const -1)
         )
        )
       )
       (i32.store offset=904
        (tee_local $8
         (i32.load offset=20127944
          (i32.const 0)
         )
        )
        (tee_local $7
         (i32.add
          (i32.load
           (i32.add
            (get_local $7)
            (i32.shl
             (get_local $1)
             (i32.const 3)
            )
           )
          )
          (i32.const -1)
         )
        )
       )
       (set_local $7
        (i32.add
         (get_local $8)
         (i32.shl
          (get_local $7)
          (i32.const 2)
         )
        )
       )
       (br $label$61)
      )
      (i32.store offset=904
       (tee_local $7
        (i32.load offset=20127944
         (i32.const 0)
        )
       )
       (i32.const 0)
      )
     )
     (set_local $0
      (i32.load
       (get_local $7)
      )
     )
    )
    (set_local $9
     (get_local $0)
    )
    (i32.store offset=1076
     (i32.const 0)
     (i32.add
      (tee_local $7
       (i32.load offset=1076
        (i32.const 0)
       )
      )
      (i32.const 24)
     )
    )
    (set_local $1
     (call $_ZN11LibraryFile3GetER8MoveNode
      (i32.load offset=20127948
       (i32.const 0)
      )
      (tee_local $0
       (i32.add
        (get_local $7)
        (i32.const 20062272)
       )
      )
     )
    )
    (set_local $7
     (i32.load offset=20128056
      (i32.const 0)
     )
    )
    (set_local $6
     (get_local $0)
    )
    (br_if $label$1
     (get_local $1)
    )
   )
  )
  (get_local $7)
 )
 (func $_Z4initv (; 54 ;) (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $0
      (i32.load offset=1060
       (i32.const 0)
      )
     )
     (i32.const 8388606)
    )
   )
   (set_local $4
    (i32.const 10)
   )
   (set_local $3
    (i32.const 0)
   )
   (block $label$1
    (loop $label$2
     (i32.store8
      (i32.add
       (tee_local $2
        (i32.add
         (get_local $0)
         (get_local $3)
        )
       )
       (i32.const 134208)
      )
      (get_local $4)
     )
     (set_local $1
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (br_if $label$1
      (i32.gt_u
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
       (i32.const 8388606)
      )
     )
     (set_local $4
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.const 20128064)
       )
      )
     )
     (set_local $2
      (i32.ne
       (get_local $3)
       (i32.const 12)
      )
     )
     (set_local $3
      (get_local $1)
     )
     (br_if $label$2
      (get_local $2)
     )
    )
   )
   (i32.store offset=1060
    (i32.const 0)
    (tee_local $3
     (i32.add
      (get_local $0)
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
  )
  (i32.store offset=1064
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=1060
   (i32.const 0)
   (i32.const 0)
  )
  (drop
   (call $_Z4growj
    (i32.const 32)
   )
  )
  (i32.store offset=1080
   (i32.const 0)
   (i32.const 2097152)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 2097152)
  )
  (block $label$3
   (block $label$4
    (block $label$5
     (br_if $label$5
      (i32.gt_u
       (tee_local $0
        (i32.load offset=1060
         (i32.const 0)
        )
       )
       (i32.const 8388606)
      )
     )
     (set_local $4
      (i32.const 10)
     )
     (set_local $3
      (i32.const 0)
     )
     (block $label$6
      (loop $label$7
       (i32.store8
        (i32.add
         (tee_local $2
          (i32.add
           (get_local $0)
           (get_local $3)
          )
         )
         (i32.const 134208)
        )
        (get_local $4)
       )
       (set_local $1
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (br_if $label$6
        (i32.gt_u
         (i32.add
          (get_local $2)
          (i32.const 1)
         )
         (i32.const 8388606)
        )
       )
       (set_local $4
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 20128080)
         )
        )
       )
       (set_local $2
        (i32.ne
         (get_local $3)
         (i32.const 13)
        )
       )
       (set_local $3
        (get_local $1)
       )
       (br_if $label$7
        (get_local $2)
       )
      )
     )
     (set_local $3
      (i32.const 0)
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $0
       (i32.add
        (get_local $0)
        (get_local $1)
       )
      )
     )
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.const 134208)
      )
      (i32.const 0)
     )
     (i32.store offset=20127940
      (i32.const 0)
      (i32.const 22159424)
     )
     (i32.store offset=1076
      (i32.const 0)
      (i32.const 2098956)
     )
     (drop
      (call $memset
       (i32.const 22159424)
       (i32.const 0)
       (i32.const 1804)
      )
     )
     (br_if $label$4
      (i32.gt_u
       (get_local $0)
       (i32.const 8388606)
      )
     )
     (set_local $4
      (i32.const 10)
     )
     (block $label$8
      (loop $label$9
       (i32.store8
        (i32.add
         (tee_local $2
          (i32.add
           (get_local $0)
           (get_local $3)
          )
         )
         (i32.const 134208)
        )
        (get_local $4)
       )
       (set_local $1
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (br_if $label$8
        (i32.gt_u
         (i32.add
          (get_local $2)
          (i32.const 1)
         )
         (i32.const 8388606)
        )
       )
       (set_local $4
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 20128096)
         )
        )
       )
       (set_local $2
        (i32.ne
         (get_local $3)
         (i32.const 16)
        )
       )
       (set_local $3
        (get_local $1)
       )
       (br_if $label$9
        (get_local $2)
       )
      )
     )
     (i32.store offset=1060
      (i32.const 0)
      (tee_local $4
       (i32.add
        (get_local $0)
        (get_local $1)
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
     (i32.store offset=20127944
      (i32.const 0)
      (i32.const 22161228)
     )
     (i32.store offset=1076
      (i32.const 0)
      (i32.const 2099864)
     )
     (drop
      (call $memset
       (i32.const 22161228)
       (i32.const 0)
       (i32.const 904)
      )
     )
     (i32.store offset=22162132
      (i32.const 0)
      (i32.const -1)
     )
     (br_if $label$3
      (i32.gt_u
       (get_local $4)
       (i32.const 8388606)
      )
     )
     (set_local $1
      (i32.const 10)
     )
     (set_local $2
      (i32.const -12)
     )
     (block $label$10
      (loop $label$11
       (set_local $3
        (get_local $2)
       )
       (i32.store8
        (i32.add
         (get_local $4)
         (i32.const 134208)
        )
        (get_local $1)
       )
       (br_if $label$10
        (i32.gt_u
         (tee_local $4
          (i32.add
           (get_local $4)
           (i32.const 1)
          )
         )
         (i32.const 8388606)
        )
       )
       (set_local $2
        (i32.add
         (get_local $3)
         (i32.const 1)
        )
       )
       (set_local $1
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.const 20128140)
         )
        )
       )
       (br_if $label$11
        (get_local $3)
       )
      )
     )
     (i32.store offset=1060
      (i32.const 0)
      (get_local $4)
     )
     (i32.store8
      (i32.add
       (get_local $4)
       (i32.const 134208)
      )
      (i32.const 0)
     )
     (br $label$3)
    )
    (i32.store offset=20127940
     (i32.const 0)
     (i32.const 22159424)
    )
    (i32.store offset=1076
     (i32.const 0)
     (i32.const 2098956)
    )
    (drop
     (call $memset
      (i32.const 22159424)
      (i32.const 0)
      (i32.const 1804)
     )
    )
   )
   (i32.store offset=20127944
    (i32.const 0)
    (i32.const 22161228)
   )
   (i32.store offset=1076
    (i32.const 0)
    (i32.const 2099864)
   )
   (drop
    (call $memset
     (i32.const 22161228)
     (i32.const 0)
     (i32.const 904)
    )
   )
   (i32.store offset=22162132
    (i32.const 0)
    (i32.const -1)
   )
  )
  (i32.store offset=20127948
   (i32.const 0)
   (i32.const 22162136)
  )
  (i32.store offset=1076
   (i32.const 0)
   (i32.const 2099880)
  )
  (i32.const 32)
 )
)
