#!/usr/bin/env sh
# shellcheck disable=SC2154

#
# Simple shell logger.
#
# Keep it POSIX.
#

# Config.
  [ -n "$cosmos_config_log_path" ]          || cosmos_config_log_path='tmp/logs'
  [ -n "$cosmos_config_log_color" ]         || cosmos_config_log_color='true'
  [ -n "$cosmos_config_log_emoji" ]         || cosmos_config_log_emoji='true'
  [ -n "$cosmos_config_log_prefix_begin" ]  || cosmos_config_log_prefix_begin='['
  [ -n "$cosmos_config_log_prefix_end" ]    || cosmos_config_log_prefix_end=']'
  [ -n "$cosmos_config_log_emoji_error" ]   || cosmos_config_log_emoji_error='❌'
  [ -n "$cosmos_config_log_emoji_warn" ]    || cosmos_config_log_emoji_warn='⚠️'
  [ -n "$cosmos_config_log_emoji_info" ]    || cosmos_config_log_emoji_info='ℹ️'
  [ -n "$cosmos_config_log_emoji_debug" ]   || cosmos_config_log_emoji_debug='🐛'
  [ -n "$cosmos_config_log_emoji_trace" ]   || cosmos_config_log_emoji_trace='🔍'
  [ -n "$cosmos_config_log_emoji_silly" ]   || cosmos_config_log_emoji_silly='🤪'
  [ -n "$cosmos_config_log_file" ]          || cosmos_config_log_file='true'
  [ -n "$cosmos_config_log_level_file" ]    || cosmos_config_log_level_file='debug'
  [ -n "$cosmos_config_log_level_console" ] || cosmos_config_log_level_console='info'
  [ -n "$cosmos_config_log_level" ]         || cosmos_config_log_level='info'
  [ -n "$cosmos_config_log_console" ]       || cosmos_config_log_console='true'
  [ -n "$cosmos_config_log_console_timestamp" ] || cosmos_config_log_console_timestamp='false'
  [ -n "$cosmos_config_log_file_timestamp" ]    || cosmos_config_log_file_timestamp='true'

  # Reset color to original.
  cReset='\033[0m'

  # Foreground, text.
  cRed='\033[0;31m'
  cGreen='\033[0;32m'
  cYellow='\033[0;33m'
  cBlue='\033[0;34m'
  cMagenta='\033[0;35m'
  cCyan='\033[0;36m'
  cWhite='\033[1;37m'

  # Foreground, text, light.
  cLRed='\033[1;31m'
  cLGreen='\033[1;32m'
  cLYellow='\033[1;33m'
  cLBlue='\033[1;34m'
  cLMagenta='\033[1;35m'
  cLCyan='\033[1;36m'

  # Count failures. When/if we want to exit early/gracefully.
  this_fail=0

  # Manage log level console.
  case "$cosmos_config_log_level_console" in
    off|false|0)
      this_log_level_console=0
    ;;

    err|error|1)
      this_log_level_console=1
    ;;

    warn|warning|2)
      this_log_level_console=2
    ;;

    info|3)
      this_log_level_console=3
    ;;

    debug|4)
      this_log_level_console=4
    ;;

    trace|5)
      this_log_level_console=5
    ;;

    silly|6)
      this_log_level_console=6
    ;;

    *)
      this_log_level_console=3
    ;;
  esac

  # Manage log file.
  case "$cosmos_config_log_level_file" in
    off|false|0)
      this_log_level_file=0
    ;;

    err|error|1)
      this_log_level_file=1
    ;;

    warn|warning|2)
      this_log_level_file=2
    ;;

    info|3)
      this_log_level_file=3
    ;;

    debug|4)
      this_log_level_file=4
    ;;

    trace|5)
      this_log_level_file=5
    ;;

    silly|6)
      this_log_level_file=6
    ;;

    *)
      this_log_level_file=4
    ;;
  esac

# Simple logger.
  this_log() {
    local_message=''
    local_message="$1"
    local_level=''
    local_level="$2"
    local_color=''
    local_color="$3"
    local_prefix_begin=''
    local_prefix_begin="$4"
    local_prefix_end=''
    local_prefix_end="$5"
    local_suffix="$6"
    local_emoji=''
    local_emoji="$7"
    local_append=''
    local_append="$8"
    local_output_console=''
    local_output_file=''

    # Get out when both logs are off.
    if [ "$this_log_level_console" -lt 1 ] && [ "$this_log_level_file" -lt 1 ]; then
      return 0
    fi

    # Get out when that log level is greater than both this log levels.
    if [ "$local_level" -gt "$this_log_level_console" ] && [ "$local_level" -gt "$this_log_level_file" ]; then
      return 0
    fi

    # Get out when no message is given.
    [ -n "$local_message" ]     || return 0

    if [ "$local_append" != 'true' ]; then

      if [ -n "$local_prefix_begin" ]; then
        local_output_console="${local_output_console}${local_prefix_begin} "
        local_output_file="${local_output_file}${local_prefix_begin} "
      fi

      if [ "$cosmos_config_log_emoji" = 'true' ]; then
        if [ -n "$local_emoji" ]; then
          local_output_console="${local_output_console}${local_emoji} "
        fi
      fi

      if [ "$cosmos_config_log_color" = 'true' ]; then
        if [ -n "$local_color" ]; then
          local_output_console="${local_output_console}${local_color}"
        fi
      fi

      case "$local_level" in
        1)
          local_output_console="${local_output_console}error "
          local_output_file="${local_output_file}error "
        ;;

        2)
          local_output_console="${local_output_console}warn  "
          local_output_file="${local_output_file}warn  "
        ;;

        3)
          local_output_console="${local_output_console}info  "
          local_output_file="${local_output_file}info  "
        ;;

        4)
          local_output_console="${local_output_console}debug "
          local_output_file="${local_output_file}debug "
        ;;

        5)
          local_output_console="${local_output_console}trace "
          local_output_file="${local_output_file}trace "
        ;;

        6)
          local_output_console="${local_output_console}silly "
          local_output_file="${local_output_file}silly "
        ;;
      esac

      if [ "$cosmos_config_log_color" = 'true' ]; then
        if [ -n "$local_color" ]; then
          local_output_console="${local_output_console}${cReset} "
        fi
      fi

      if [ -n "$local_prefix_end" ]; then
        local_output_console="${local_output_console}${local_prefix_end} "
        local_output_file="${local_output_file}${local_prefix_end} "
      fi

      now="$(date "+%Y-%m-%d-%H%M%S")"

      if [ "$cosmos_config_log_console_timestamp" = 'true' ]; then
        local_output_console="${local_output_console}${now} "
      fi

      if [ "$cosmos_config_log_file_timestamp" = 'true' ]; then
        local_output_file="${local_output_file}${now} "
      fi

    fi

    if [ -n "$local_message" ]; then
      local_output_console="${local_output_console}${local_message}"
      local_output_file="${local_output_file}${local_message}"
    fi

    if [ -n "$local_suffix" ]; then
      local_output_console="${local_output_console}${local_suffix}"
      local_output_file="${local_output_file}${local_suffix}"
    fi

    if [ "$cosmos_config_log_console" != 'false' ] && [ "$local_level" -le "$this_log_level_console" ]; then
      printf '%b' "$local_output_console"
    fi

    if [ "$cosmos_config_log_file" != 'false' ] && [ "$local_level" -le "$this_log_level_file" ]; then
      [ -d "$cosmos_config_log_path" ] || mkdir -p "$cosmos_config_log_path"
      printf '%b' "$local_output_file" >> "$cosmos_config_log_path/cosmos.log"
    fi
  }

  log_error() {
    this_log "$1" '1' "$cLRed" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_error"
  }

  log_warn() {
    this_log "$1" '2' "$cLYellow" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_warn"
  }

  log_info() {
    this_log "$1" '3' "$cWhite" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_info"
  }

  log_info_begin() {
    this_log "$1" '3' "$cWhite" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '' "$cosmos_config_log_emoji_info"
  }

  log_info_end() {
    this_log "$1" '3' "$cWhite" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_info" 'true'
  }

  log_debug() {
    this_log "$1" '4' "$cLGreen" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_debug"
  }

  log_trace() {
    this_log "$1" '5' "$cLCyan" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_trace"
  }

  log_silly() {
    this_log "$1" '6' "$cMagenta" "$cosmos_config_log_prefix_begin" "$cosmos_config_log_prefix_end" '\n' "$cosmos_config_log_emoji_silly"
  }

[ "$this_fail" -gt 0 ] && return 1

# When this file is sourced then get out of here else run some tests/anything
# below this statement.
  if (return 0 2>/dev/null); then
    return 0
  fi

# Simple tests.
  log_error "This is a test error message."
  log_warn "This is a test warning message."
  log_info "This is a test info message."
  log_debug "This is a test debug message."
  log_trace "This is a test trace message."
  log_silly "This is a test silly message."

  log_info_begin 'This is a test message...'
  sleep 3
  log_info_end ' Done.'
  log_info 'This is a final test info message.'
