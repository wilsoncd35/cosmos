#!/usr/bin/env bats

setup_file() {
  echo "# # Example bats test suite." >&3
}

@test "Example bats test one." {
  run echo "Hello, Bats!"
  [ "$status" -eq 0 ]
  [ "$output" = "Hello, Bats!" ]
}

@test "Example bats test two." {
  run bash -c 'exit 1'
  [ "$status" -eq 1 ]
}
